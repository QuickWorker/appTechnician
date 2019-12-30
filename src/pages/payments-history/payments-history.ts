import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PaymentServiceProvider } from '../../providers/payment-service/payment-service';
import { Storage } from '@ionic/storage';
import { UtilsServiceProvider } from '../../providers/utils-service/utils-service';

@IonicPage()
@Component({
  selector: 'page-payments-history',
  templateUrl: 'payments-history.html',
})

/**
 * Manages all methods 
 */
export class PaymentsHistoryPage {

  /**
* Value of the header title
*/
  headerTitle;

  /**
* Value of the paymentsList
*/
  paymentsList: Array<any> = []

  /**
*  loads first when entering to the page 
*  initilizing headerTitle value
*/
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public paymentService: PaymentServiceProvider,
    public storage: Storage,
    public utils: UtilsServiceProvider
  ) {
    this.headerTitle = "Payments History";
  }

  /**
*  Fired after loading constructor
*  calling getPaymentHistory value
*/
  ionViewDidLoad() {
    this.getPaymentHistory();
  }

  /**
*  getting payment history from server
* start loading when method calls 
   * stop loading when getting response from server
   * @returns returns payment history details
*/
  getPaymentHistory() {
    this.utils.presentLoading();
    this.storage.get("technician_id").then((id) => {
      let historyObj = {
        action: "payment_history",
        id: id
      }
      this.paymentService.getPayments(historyObj).subscribe((result) => {
        this.utils.dismissLoading();
        this.paymentsList = result.data;
      })
    })

  }



}
