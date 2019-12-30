import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';
import { ServiceReqserviceProvider } from '../../providers/service-reqservice/service-reqservice';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-collect-cash',
  templateUrl: 'collect-cash.html',
})

/**
 * Manages all methods 
 */
export class CollectCashPage {

  /**
* declaring cashForm
*/
  private cashForm: FormGroup;

  /**
* Value of the paymentDetails
*/
  paymentDetails: any;

  /**
*  loads first when entering to the page 
*  getting paymentDetails using navparams
*  initializing paymentDetails 
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    public reqService: ServiceReqserviceProvider,
    public utils: UtilsServiceProvider,
    public storage: Storage,
  ) {
    this.cashForm = this.formBuilder.group({
      amount: ['', Validators.required],
      description: [''],
    });
    this.paymentDetails = this.navParams.get('cashDetails');
  }

  /**
*  Fired after loading constructor
*  initializing form values
*/
  ionViewDidLoad() {
    this.cashForm.controls['amount'].setValue(this.paymentDetails.charges ? this.paymentDetails.charges : '');
    this.cashForm.controls['description'].setValue(this.paymentDetails.desc ? this.paymentDetails.desc : '');
  }

  /**
*  submitting payment to server
*  @returns success or failure message from server
*/
  submitCash() {
    this.storage.get("technician_id").then((id) => {
      let cashObj = {
        action: 'collect_cash',
        id: id,
        jid: this.paymentDetails.job_id,
        amount: this.cashForm.value.amount,
        description: this.cashForm.value.description
      }
      this.reqService.collectCash(cashObj).subscribe((result) => {
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
