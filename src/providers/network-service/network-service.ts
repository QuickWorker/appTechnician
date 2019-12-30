import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { ToastController } from 'ionic-angular';

/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class NetworkServiceProvider {

  /**
*  loads first when entering to the page 
*/
  constructor(
    public http: HttpClient,
    private network: Network,
    public toastCtrl: ToastController,
  ) {
  }

  /**
* @returns check for the network connection using ionic network plugin 
*/
  networkCheck() {
    this.network.onDisconnect().subscribe((res) => {
      this.presentToast('Please Check your internet connection.');
    });

    this.network.onConnect().subscribe((res) => {

    });
  }

  /**
* @returns Showing toast if network not connected
*/
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      position: 'middle',
      showCloseButton: true
    });

    toast.present();
  }

}
