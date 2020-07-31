import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
  IvtStateModule,
} from '@ivt/state';
import { IvtUiModule } from '@ivt/ui';
import { DefaultDataServiceConfig } from '@ngrx/data';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const IVT_STATE_CONFIGURATION_VALUE: IvtStateConfiguration = {
  apiUrl: environment.apiUrl,
};

const defaultDataServiceConfig: DefaultDataServiceConfig = {
  root: environment.apiUrl,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IvtStateModule,
    IvtUiModule,
  ],
  providers: [
    {
      provide: IVT_STATE_CONFIGURATION,
      useValue: IVT_STATE_CONFIGURATION_VALUE,
    },
    { provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
