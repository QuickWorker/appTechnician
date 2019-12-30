import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ServiceRequestsPage } from './service-requests';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    ServiceRequestsPage,
  ],
  imports: [
    IonicPageModule.forChild(ServiceRequestsPage),
    ComponentsModule
  ],
})
export class ServiceRequestsPageModule {}
