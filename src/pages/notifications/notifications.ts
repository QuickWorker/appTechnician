import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { Storage } from '@ionic/storage';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})

/**
 * Manages all methods 
 */
export class NotificationsPage {

  /**
* Value of the header title
*/
  headerTitle;

  /**
* Value of the notificationsList
*/
  notificationsList: Array<any> = []

  /**
*  loads first when entering to the page 
*  initializing header title
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationService: NotificationServiceProvider,
    public storage: Storage,
    public utils: UtilsServiceProvider
  ) {
    this.headerTitle = "Notifcations";
  }

  /**
*  Fired after loading constructor
*  calling getNotifications method
*/
  ionViewDidLoad() {
    this.getNotifications();
  }

  /**
   * start loading when method calls 
   * stop loading when getting response from server
   *  getting stored technician id
   *  get notifications from server
   * @returns return notifications list 
*/
  getNotifications() {
    this.utils.presentLoading();
    this.notificationsList = [];
    this.storage.get("technician_id").then((id) => {
      let notificationObj = {
        action: "list_notifications",
        id: id
      }
      this.notificationService.getNotificationsList(notificationObj).subscribe((result) => {
        this.utils.dismissLoading();
        if (result) {
          this.notificationsList = result.data;
        }

      })
    })

  }

  /**
*  refresh the page
*  calling getNotifications method
*/
  doRefresh(refresher) {
    this.getNotifications();
    refresher.complete();
  }

}
