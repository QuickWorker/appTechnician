import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServiceReqserviceProvider } from '../../providers/service-reqservice/service-reqservice';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-otp-model',
  templateUrl: 'otp-model.html',
})

/**
 * Manages all methods 
 */
export class OtpModelPage {

  /**
* Value of the otp
*/
  otp;

  /**
* Value of the jobId
*/
  jobId;

  /**
* Value of the jobDetails
*/
  jobDetails: Array<any> = [];

  /**
 *  loads first when entering to the page 
 *  initializing job id 
 *  receiving data using navparams
 */
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public requestService: ServiceReqserviceProvider,
    public utils: UtilsServiceProvider,
    public storage: Storage,
  ) {
    this.jobId = this.navParams.get("job_id")
  }

  /**
*  Fired after loading constructor
*  calling getjobDetails method
*/
  ionViewDidLoad() {
    this.getjobDetails();
  }

  /**
*  getting job details from server
* start loading when method calls 
   * stop loading when getting response from server
   * @returns returns job details
*/
  getjobDetails() {
    this.utils.presentLoading();
    let jobObj = {
      action: "get_job_data",
      id: this.jobId
    }
    this.requestService.getjobDetails(jobObj).subscribe((result) => {
      this.utils.dismissLoading();
      if (result) {
        this.jobDetails.push(result.data);
      }

    })
  }

  /**
*  submitting otp provided by user
* @returns return success or failure 
*/
  submitOtp() {
    this.storage.get("technician_id").then((id) => {
      let otpObj = {
        action: "validate_job_otp",
        id: id,
        jid: this.jobId,
        otp: this.otp
      }
      this.requestService.verifyOtp(otpObj).subscribe((result) => {
        if (result) {
          if (result.status == "OK") {
            this.utils.presentAlert("Success", result.msg)
            this.navCtrl.setRoot("ServiceRequestsPage");
          } else {
            this.utils.presentAlert("Oops", result.error)
          }
        }
      })
    })

  }

}
