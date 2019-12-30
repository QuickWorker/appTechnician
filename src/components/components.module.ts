import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header';
import { FooterComponent } from './footer/footer';
import { IonicModule } from 'ionic-angular';


@NgModule({
	declarations: [HeaderComponent,
    FooterComponent],
	imports: [IonicModule],
	exports: [HeaderComponent,
    FooterComponent]
})
export class ComponentsModule {}
