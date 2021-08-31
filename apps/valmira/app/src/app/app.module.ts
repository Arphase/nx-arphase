import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { icons } from './icons';
import { MenuModule, FooterModule } from '@valmira/ui/core';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NzIconModule.forRoot(icons),
    MenuModule,
    FooterModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
