import { Component, Input } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, MenuController } from 'ionic-angular';

@Component({
  selector: 'header',
  templateUrl: 'header.html'
})
export class HeaderComponent {

  /**
*  To initiate this component whereever we used in a template.
*  @param title bounded variable in that template
*/
  @Input() title: any;

  /**
* defining hideicons
*/
  hideicons: boolean;

  /**
*  loads first when entering to the page 
*  disabling menu to swipe
*/
  constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public menuCtrl: MenuController
  ) {
    this.menuCtrl.swipeEnable(false);

  }

  /**
*  removing stored values in app
*/
  logout() {
    this.navCtrl.setRoot('LoginPage');
    this.storage.remove('user_id');
    this.storage.remove('auth');
  }


}
