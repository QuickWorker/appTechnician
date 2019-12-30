import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceReqserviceProvider } from '../../providers/service-reqservice/service-reqservice';
import { Storage } from '@ionic/storage';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator, LaunchNavigatorOptions } from '@ionic-native/launch-navigator';

@IonicPage()
@Component({
  selector: 'page-service-requests',
  templateUrl: 'service-requests.html',
})

/**
 * Manages all methods 
 */
export class ServiceRequestsPage {

  /**
* Value of the header title
*/
  headerTitle;

  /**
* Value of the requestList
*/
  requestList: Array<any> = [];

  /**
* initializing Value of the searchType
*/
  searchType = "current";

  /**
*  loads first when entering to the page 
*  initilizing headerTitle value
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public reqService: ServiceReqserviceProvider,
    public storage: Storage,
    public utils: UtilsServiceProvider,
    private geolocation: Geolocation,
    private launchNavigator: LaunchNavigator
  ) {
    this.headerTitle = "Service Requests";
  }

  /**
*  Fired after loading constructor
* calling getServicesList method
*/
  ionViewDidLoad() {
    this.getServicesList();
  }

  /**
*  Fired when change the segment
* calling getServicesList method
*/
  segmentChanged() {
    this.getServicesList();
  }

  /**
*  getting service list from server
* start loading when method calls 
   * stop loading when getting response from server
   * @returns returns service requests list
*/
  getServicesList() {
    this.utils.presentLoading();
    this.storage.get('technician_id').then((id) => {
      let reqObj = {
        action: "list_jobs",
        id: id
      }
      this.reqService.getServiceRequests(reqObj).subscribe((result) => {
        this.utils.dismissLoading();
        this.requestList = result.data;
        // console.log(this.requestList)
      })
    })
  }

  /**
* @returns navigate to payment page with parameters
*/
  goToPayment(id, charges, desc) {
    let cashObj = {
      job_id: id,
      charges: charges,
      desc: desc
    }
    this.navCtrl.push("CollectCashPage", { cashDetails: cashObj });
  }

  /**
*  @returns navigate to otp page with parameters
*/
  verify(id) {
    this.navCtrl.push("OtpModelPage", { job_id: id });
  }

  /**
*   @returns navigating customer using latitude and longitude
*/
  locateCustomer(lat, lng) {
    let latitude = parseFloat(lat);
    let longitude = parseFloat(lng);
    this.navigateMaps(latitude, longitude)
  }

  /**
*  @returns navigating to external maps app for directions
*/
  navigateMaps(lat, lng) {
    this.geolocation.getCurrentPosition().then((resp) => {
      let options: LaunchNavigatorOptions = {
        start: [resp.coords.latitude, resp.coords.longitude],
        app: this.launchNavigator.APP.USER_SELECT
      };
      this.launchNavigator.navigate([lat, lng], options)
        .then(
          success => console.log('Launched navigator'),
          error => console.log('Error launching navigator', error)
        );
    })
  }

  /**
   * submit completed status
   * getting technician id from app storage
   * @returns success or failure message
*/
  completeJob(jobId) {
    this.storage.get('technician_id').then((id) => {
      let jobObj = {
        action: "update_work_complete",
        id: id,
        jid: jobId
      }
      this.reqService.postCompleted(jobObj).subscribe((result) => {
        if (result.status == "OK") {
          this.utils.presentAlert("Success", result.msg)
        } else {
          this.utils.presentAlert("Oops", result.error)
        }
      })
    })

  }

  /**
*  refresh the page
*/
  doRefresh(refresher) {
    this.getServicesList();
    refresher.complete();
  }

}
