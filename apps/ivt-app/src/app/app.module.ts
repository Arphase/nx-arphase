import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouteReuseStrategy } from '@angular/router';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { IonicStorageModule } from '@ionic/storage-angular';
import { IVT_UI_STATE_CONFIGURATION, IvtStateModule, IvtUiStateConfiguration } from '@ivt/u-state';
import * as Sentry from '@sentry/angular';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NgxMaskModule } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { icons } from './icons';

registerLocaleData(es);

const IVT_STATE_CONFIGURATION_VALUE: IvtUiStateConfiguration = {
  apiUrl: environment.apiUrl,
  version: environment.version,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IvtStateModule,
    NzModalModule,
    IonicModule.forRoot(),
    NgxMaskModule.forRoot(),
    NzIconModule.forRoot(icons),
    IonicStorageModule.forRoot(),
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: IVT_UI_STATE_CONFIGURATION,
      useValue: IVT_STATE_CONFIGURATION_VALUE,
    },
    {
      provide: ErrorHandler,
      useValue: Sentry.createErrorHandler({}),
    },
    {
      provide: Sentry.TraceService,
      deps: [Router],
    },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => null,
      deps: [Sentry.TraceService],
      multi: true,
    },
    { provide: NZ_I18N, useValue: es_ES },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
