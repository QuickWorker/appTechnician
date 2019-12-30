import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PaymentsHistoryPage } from './payments-history';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    PaymentsHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(PaymentsHistoryPage),
    ComponentsModule
  ],
})
export class PaymentsHistoryPageModule {}
