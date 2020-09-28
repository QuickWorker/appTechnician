import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsuccessPage } from './paymentsuccess';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PaymentsuccessPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsuccessPage),
    ComponentsModule
  ],
})
export class PaymentsuccessPageModule {}
