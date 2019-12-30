import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import *  as AppConfig from '../../app/serverCalls';
import { Observable } from 'rxjs';

/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class AuthServiceProvider {

  /**
* Value of the cfg
*/
  cfg: any;

  /**
*  loads first when entering to the page 
*/
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  /**
* @returns sending post request to send sms
*/
  sendSms(smsObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.api, smsObj, httpOptions)
  }

  /**
*  @returns sending post request to check mobile number exist or not
*/
  checkNumber(number, fcmToken, deviceid): Observable<any> {
    let numobj = {
      action: "login",
      phone: number,
      token: fcmToken,
      device_id: deviceid
    }
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, numobj, httpOptions)
  }


}
