import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CollectCashPage } from './collect-cash';

@NgModule({
  declarations: [
    CollectCashPage,
  ],
  imports: [
    IonicPageModule.forChild(CollectCashPage),
  ],
})
export class CollectCashPageModule {}
