import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IVT_DATA_CONFIGURATION,
  IvtDataConfiguration,
  IvtDataModule,
} from '@innovatech/state';
import { IvtUiModule } from '@innovatech/ui';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const IVT_DATA_CONFIGURATION_VALUE: IvtDataConfiguration = {
  apiUrl: environment.apiUrl,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IvtDataModule,
    IvtUiModule,
  ],
  providers: [
    { provide: IVT_DATA_CONFIGURATION, useValue: IVT_DATA_CONFIGURATION_VALUE },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
