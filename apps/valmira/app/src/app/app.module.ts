import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApsAdditionalEntityCollectionReducerMethodsFactory,
  ApsAdditionalPropertyPersistenceResultHandler,
  LoadingInterceptorService,
} from '@arphase/ui/core';
import { EntityCollectionReducerMethodsFactory, EntityDataModule, PersistenceResultHandler } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as Sentry from '@sentry/angular';
import {
  entityConfig,
  FooterModule,
  HttpProxyService,
  MenuModule,
  VALMIRA_CONFIGURATION,
  ValmiraConfiguration,
} from '@valmira/ui/core';
import { Router } from 'express';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NgxMaskModule } from 'ngx-mask';
import { NgxStripeModule } from 'ngx-stripe';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { icons } from './icons';

registerLocaleData(es);

export const reducers: ActionReducerMap<{ router: RouterReducerState }> = {
  router: routerReducer,
};

const VALMIRA_CONFIGURATION_VALUE: ValmiraConfiguration = {
  apiUrl: environment.apiUrl,
  version: environment.version,
};
@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'valmira' }),
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MenuModule,
    FooterModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Valmira',
      maxAge: 25,
    }),
    NzIconModule.forRoot(icons),
    NgxStripeModule.forRoot(environment.stripeKey),
    EffectsModule.forRoot([]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EntityDataModule.forRoot(entityConfig),
    NgxMaskModule.forRoot(),
  ],
  providers: [
    { provide: VALMIRA_CONFIGURATION, useValue: VALMIRA_CONFIGURATION_VALUE },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptorService, multi: true },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: ApsAdditionalEntityCollectionReducerMethodsFactory,
    },
    {
      provide: PersistenceResultHandler,
      useClass: ApsAdditionalPropertyPersistenceResultHandler,
    },
    { provide: ErrorHandler, useValue: Sentry.createErrorHandler({}) },
    { provide: Sentry.TraceService, deps: [Router] },
    {
      provide: APP_INITIALIZER,
      useFactory: () => () => null,
      deps: [Sentry.TraceService],
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
