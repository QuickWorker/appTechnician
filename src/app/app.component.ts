import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';
import { NetworkServiceProvider } from '../providers/network-service/network-service';
import { FCM } from '@ionic-native/fcm';

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
    public splashScreen: SplashScreen,
    public storage: Storage,
    public fcm: FCM,
    public networkService: NetworkServiceProvider
  ) {
    this.initializeApp();
    this.storage.get('auth').then((auth) => {
      console.log(auth)
      if (auth) {
        this.storage.get('technician_id').then((id) => {
          if (id) {
            this.rootPage = "ServiceRequestsPage"
          }
        })
      } else {
        this.rootPage = "LoginPage"
      }

    })
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Notifications', component: "NotificationsPage", icon: "notifications" },
      { title: 'Payments History', component: "PaymentsHistoryPage", icon: "list-box" },
      // { title: 'Maps', component: "MapsPage", icon: "map" },      
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
  }

  /**
* opening page on selection
*/
  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
