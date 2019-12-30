import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OtpModelPage } from './otp-model';

@NgModule({
  declarations: [
    OtpModelPage,
  ],
  imports: [
    IonicPageModule.forChild(OtpModelPage),
  ],
})
export class OtpModelPageModule {}
