import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServicerequestPage } from './servicerequest';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ServicerequestPage,
  ],
  imports: [
    IonicPageModule.forChild(ServicerequestPage),
    ComponentsModule

  ],
})
export class ServicerequestPageModule {}
