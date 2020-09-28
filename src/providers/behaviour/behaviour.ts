import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
/*
  Generated class for the BehaviourProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class BehaviourProvider {
  private footerSelectitem = new BehaviorSubject("");

  constructor(public http: HttpClient) {
    console.log('Hello BehaviourProvider Provider');
  }

  getfooterSelectItem() {
    return this.footerSelectitem;
  }
  updateFooterItem(item){
    this.footerSelectitem=item;
  }
}
