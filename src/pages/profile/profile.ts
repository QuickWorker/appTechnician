import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProfileServiceProvider } from '../../providers/profile-service/profile-service';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Storage } from '@ionic/storage';
import { attahments } from '../../app/serverCalls';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})

/**
 * Manages all methods 
 */
export class ProfilePage {

  /**
* Value of the header title
*/
  headerTitle;

  /**
* Value of the profileData
*/
  profileData;

  /**
* initializing Value of the imgurl
*/
  imgurl = attahments.imgUrl;

  /**
*  loads first when entering to the page 
*  initilizing headerTitle value
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public profileService: ProfileServiceProvider,
    public utils: UtilsServiceProvider,
    public storage: Storage,
  ) {
    this.headerTitle = "Profile";
  }

  /**
*  Fired after loading constructor
*  calling getProfileData method
*/
  ionViewDidLoad() {
    this.getProfileData();
  }

    /**
*  getting profile data from serve
* start loading when method calls 
   * stop loading when getting response from server
   * @returns profile data
*/
  getProfileData() {
    this.utils.presentLoading();
    this.storage.get('technician_id').then((id) => {
      let profileObj = {
        action: "get_user_data",
        id: id
      }
      this.profileService.getProfile(profileObj).subscribe((result) => {
        this.utils.dismissLoading();
        if (result) {
          this.profileData = result.data;
        }
      })
    })
  }

}
