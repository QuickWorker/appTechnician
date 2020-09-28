import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { UtilsServiceProvider } from '../providers/utils-service/utils-service';
import { ChatServiceProvider } from '../providers/chat-service/chat-service';
import { NetworkServiceProvider } from '../providers/network-service/network-service';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';
import { ServiceReqserviceProvider } from '../providers/service-reqservice/service-reqservice';
import { ProfileServiceProvider } from '../providers/profile-service/profile-service';
import { NotificationServiceProvider } from '../providers/notification-service/notification-service';
import { PaymentServiceProvider } from '../providers/payment-service/payment-service';
import { Geolocation } from '@ionic-native/geolocation';
import { LaunchNavigator } from '@ionic-native/launch-navigator';
import { Network } from '@ionic-native/network';
import { FCM } from '@ionic-native/fcm';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { BehaviourProvider } from '../providers/behaviour/behaviour';

@NgModule({
  declarations: [
    MyApp,
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthServiceProvider,
    UtilsServiceProvider,
    ChatServiceProvider,
    ServiceReqserviceProvider,
    ProfileServiceProvider,
    NotificationServiceProvider,
    PaymentServiceProvider,
    NetworkServiceProvider,
    Geolocation,
    LaunchNavigator,
    FCM,
    UniqueDeviceID,
    Network,
    BehaviourProvider
  ]
})
export class AppModule {}
