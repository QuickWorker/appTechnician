import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ModalController } from 'ionic-angular';

/**
 * Provider for services
*/
@Injectable()

/**
 * Manages all methods 
 */
export class UtilsServiceProvider {

  /**
* Value of the loading
*/
  loading;

  /**
*  loads first when entering to the page 
*/
  constructor(
    public loadingController: LoadingController,
    public alertController: AlertController,
    public modalController: ModalController,
  ) {

  }

  /**
* @returns common alert for entire app 
*/
  async presentAlert(head, body) {
    const alert = await this.alertController.create({
      title: head,
      message: body,
      buttons: ['OK']
    });
    await alert.present();
  }

  /**
* @returns common loader for entire app to loading
*/
  async presentLoading() {
    this.loading = await this.loadingController.create({
      spinner: 'dots',
      content: 'Please wait...',
      duration: 30000
    });
    return await this.loading.present();
  }

  /**
* @returns common loader for entire app to dismiss loading
*/
  async dismissLoading() {
    return await this.loading.dismiss();
  }

}
