import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Storage } from '@ionic/storage';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})

/**
 * Manages all methods 
 */
export class LoginPage {
   phoneno:string=''; 
  /**
* declaring showOtp
*/
  showOtp: boolean;

  /**
* Value of the fcmToken
*/
  fcmToken;

  /**
* Value of the deviceId
*/
  deviceId;

  /**
* declaring otpForm
*/
  private otpForm: FormGroup;

  /**
* declaring numberForm
*/
  private numberForm: FormGroup;

  /**
*  loads first when entering to the page 
*  setting validations to forms
*  getting firebase token
*  generating unique id for device
*/

  hidden:boolean;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public authService: AuthServiceProvider,
    public storage: Storage,
    private formBuilder: FormBuilder,
    public utils: UtilsServiceProvider,
    private fcm: FCM,
    private uniqueDeviceID: UniqueDeviceID,
  ) {
    this.numberForm = this.formBuilder.group({
      number: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10)])]

    })
    this.otpForm = this.formBuilder.group({
      first: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      second: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      third: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      fourth: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
    });
    this.showOtp = false;
    // --------fcm---------
    this.fcm.getToken().then(token => {
      this.fcmToken = token;
    });
    this.uniqueDeviceID.get()
      .then((uuid: any) => {
        this.deviceId = uuid;
      })
      .catch((error: any) => console.log(error));
  }


  /**
*  move input focus to next input 
*  @param nextElement next element information
*  @returns move cursor to next input
*/
  moveFocus(nextElement) {
    nextElement.setFocus();
  }

  /**
*  Fired when click login 
* start loading when method calls 
* stop loading when getting response from server
* checks for the mobile number
* sends otp
* @returns returns success or failure from server
*/
  login() {
    this.phoneno=this.numberForm.value.number;
    this.utils.presentLoading();
    this.authService.checkNumber(this.numberForm.value.number, this.fcmToken, this.deviceId).subscribe((result) => {
      this.utils.dismissLoading();
      if (result) {
        if (result.status) {
          if (result.status == 'OK') {
            this.storage.set("technician_id", result.data.id)
            var val = Math.floor(1000 + Math.random() * 9000);
            this.storage.set('otp', val)
            let msgObj = {
              action: "sendSms",
              phone: this.numberForm.value.number,
              message: "Your otp is " + val
            }
            this.utils.presentAlert("Otp", val);
            // this.authService.sendSms(msgObj).subscribe((result) => {
            //   // console.log(result)
            // })
            this.showOtp = true;
          }
        } else if (result.error) {
          this.utils.presentAlert("Oops", result.error)
        }
      }
    })

  }

  /**
*  Fired when you submit otp
* checks otp valid or not
* @returns navigate to home page
*/
  submitOtp() {
    this.storage.get('otp').then((otp) => {
      var o = this.otpForm.value.first + this.otpForm.value.second + this.otpForm.value.third + this.otpForm.value.fourth
      if (o == otp) {
        this.storage.set("auth", "success");
        this.storage.get('technician_id').then((id) => {
          if (id) {
            this.navCtrl.setRoot('ServiceRequestsPage')
          }
        })
      } else {
        this.utils.presentAlert("Oops", "Otp not matched.")
      }
    })
    // 
  }

  /**
*  hide otp options
*/
  hideOtp() {
    this.showOtp = false;
  }
  resendOTP(){
    var val = Math.floor(1000 + Math.random() * 9000);
    this.storage.set('otp', val)
    let msgObj = {
      action: "sendSms",
      phone: this.numberForm.value.number,
      message: "Your otp is " + val
    }
    this.utils.presentAlert("Otp", val);
    // this.authService.sendSms(msgObj).subscribe((result) => {
    //   // console.log(result)
    // })
    this.showOtp = true;
  }
}
