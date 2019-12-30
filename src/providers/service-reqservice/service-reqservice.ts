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
export class ServiceReqserviceProvider {

  /**
* Value of the header cfg
*/
  cfg: any;

  /**
*  loads first when entering to the page 
*/
  constructor(public http: HttpClient) {
    this.cfg = AppConfig.cfg;
  }

  /**
* @returns sending post request to get requested services
*/
  getServiceRequests(serviceObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, serviceObj, httpOptions)
  }

  /**
* @returns sending post request to get job details
*/
  getjobDetails(jobObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, jobObj, httpOptions)
  }

  /**
* @returns sending post request to check otp provided by user
*/
  verifyOtp(otpObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, otpObj, httpOptions)
  }

    /**
* @returns sending post request to submit paymet status
*/
  collectCash(cashObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, cashObj, httpOptions)
  }

     /**
* @returns sending post request to submit job status
*/
  postCompleted(jobId): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, jobId, httpOptions)
  }



}
