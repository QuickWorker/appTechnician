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
export class ChatServiceProvider {

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
* @returns sending post request to get chat data
*/
  chatData(chatObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, chatObj, httpOptions)
  }

  /**
* @returns sending post request to send message
*/
  postMessage(chatObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, chatObj, httpOptions)
  }

  /**
* @returns sending post request to get unread chat
*/
  unreadChat(chatObj): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.http.post(this.cfg.technicianApi, chatObj, httpOptions)
  }

}
