import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FooterModule } from '@musicr/ui/core';

import { icons } from './icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, NzIconModule.forRoot(icons), FooterModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
