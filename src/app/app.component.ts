import { Component, ViewChild } from '@angular/core';
import { Nav, Platform,App,IonicApp,MenuController,AlertController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { FCM } from '@ionic-native/fcm';
import {ServiceRequestsPage} from '../pages/service-requests/service-requests';
@Component({
  templateUrl: 'app.html'
})

/**
 * Manages all methods 
 */
export class MyApp {

  /**
 * Accessing html template
 */
  @ViewChild(Nav) nav: Nav;

  /**
* Value of the rootPage
*/
  rootPage: any;

  /**
* declaring pages
*/
  pages: Array<{ title: string, component: any, icon: any }>;

  /**
* initializing AppLogo
*/
  AppLogo = 'assets/images/sidemenu-logo.png';

  /**
*  loads first when entering to the page 
*  getting stored values in app storage
*  navigating to home page conditionally
*/
  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public app: App
    ,public ionicApp: IonicApp,private menuCtrl: MenuController,
    public alertCtrl: AlertController,


    public splashScreen: SplashScreen,
    public storage: Storage,
    public fcm: FCM,
    public networkService: NetworkServiceProvider,

  ) {

    this.initializeApp();
    this.storage.get('auth').then((auth) => {
      console.log(auth)
      if (auth) {
        this.storage.get('technician_id').then((id) => {
          if (id) {
            this.rootPage = "ServiceRequestsPage";
            
          }
          else{
        this.rootPage = "LoginPage"

          }
        })
      } else {
        this.rootPage = "LoginPage"
      }

    })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Customer OTP', component: "NotificationsPage", icon: "grid" },
      { title: 'Current Service Jobs', component: "NotificationsPage", icon: "compass" },
      { title: 'Service Jobs History', component: "NotificationsPage", icon: "compass" },
      { title: 'Chat with Admin', component: "ChatPage", icon: "mail" },
      { title: 'Notifications', component: "NotificationsPage", icon: "notifications" },
      { title: 'Collect Cash', component: "CollectCashPage", icon: "pricetag" },      
      { title: 'Payments History', component: "PaymentsHistoryPage", icon: "card" },
      { title: 'Logout', component: "LoginPage", icon: "md-log-out" },

    ];

  }

  /**
* initializing app
* setting platform ready
* checking network connection
*/
  initializeApp() {
    this.platform.ready().then(() => {
      this.networkService.networkCheck();
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.platform.is('android')) {
        this.statusBar.overlaysWebView(false);
        this.statusBar.backgroundColorByHexString('#440669');
      } else if (this.platform.is('ios')) {
        this.statusBar.styleDefault();
      }
      // this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.onNotification().subscribe(data => {
        // console.log("notification called..",data);
        if (data.wasTapped) {
          this.rootPage = data.navigation
        }

      });
    });

    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNav();
      let view = this.nav.getActive();
      let page = view ? this.nav.getActive().instance : null;
      let ready = true;
      // this.ionicApp._modalPortal.getActive() ||
      let activePortal = this.ionicApp._loadingPortal.getActive() || this.ionicApp._toastPortal.getActive() || 
                          this.ionicApp._overlayPortal.getActive() || this.ionicApp._modalPortal.getActive();
      // if (activePortal) {
      //   activePortal.dismiss();
      // } 

      if (activePortal) {
        ready = false;
        activePortal.dismiss();
        activePortal.onDidDismiss(() => { ready = true; });
        return;
     }

      // if (this.menuCtrl.isOpen()) {
      //   this.menuCtrl.close();
      //   return
      // }

      if (page && page.isRootPage) {
        this.myHandlerFunction();
      }
      else if (view && view.isOverlay) {
          this.nav.pop();
      }
      if (nav.canGoBack()) { //Can we go back?
        if(nav.getActive().name=='ServiceRequestsPage'){
          this.myHandlerFunction();
        }
       
        else{
          nav.pop();
        }
        }
         else {
          if(nav.getActive().name !='ServiceRequestsPage')
            this.nav.push(ServiceRequestsPage);
            // nav.pop();
          else
            this.myHandlerFunction() //Exit from app
        }
      }, 1);


  }

  myHandlerFunction() {
    let alert = this.alertCtrl.create({
      title: 'Exit?',
      message: 'Do you want to exit the app?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Exit',
          handler: () => {
            this.platform.exitApp();
          }
        }
      ]
    });
    alert.present();
  }
  /**
* opening page on selection
*/
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if(page.component=="LoginPage"){
      this.nav.setRoot('LoginPage');
        this.storage.remove('user_id');
        this.storage.remove('auth');
    }
    else
    {
    this.nav.setRoot(page.component);
    }
  }

  // this.navCtrl.setRoot('LoginPage');
  // this.storage.remove('user_id');
  // this.storage.remove('auth');
}
