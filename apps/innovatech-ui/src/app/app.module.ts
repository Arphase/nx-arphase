import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  IVT_STATE_CONFIGURATION,
  IvtStateConfiguration,
  IvtStateModule,
} from '@ivt/u-state';
import { IvtUiModule } from '@ivt/u-ui';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

const IVT_STATE_CONFIGURATION_VALUE: IvtStateConfiguration = {
  apiUrl: environment.apiUrl,
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
    NgxMaskModule.forRoot(),
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: IVT_STATE_CONFIGURATION,
      useValue: IVT_STATE_CONFIGURATION_VALUE,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
