import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

/**
 * Generated class for the ServicerequestPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-servicerequest',
  templateUrl: 'servicerequest.html',
})
export class ServicerequestPage {
  private requestForm: FormGroup;

  notificationsList:any;
  _title:string;
  _date:string;
  _message:string;
  headerTitle:string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder
  ) {
    this.requestForm = this.formBuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      address: ['', Validators.required],
      first: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      second: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      third: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
      fourth: ['', Validators.compose([Validators.required, Validators.maxLength(1)])],
    });
  }

  ionViewDidLoad() {
    this.headerTitle="Selected Service";
    console.log('ionViewDidLoad ServicerequestPage');
    this.notificationsList = this.navParams.get("_notlst");
    this._title=this.notificationsList.title;
    this._date=this.notificationsList.date;
    this._message=this.notificationsList.message;

    console.log(this.notificationsList);

  }

}
