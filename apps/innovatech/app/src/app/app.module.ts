import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { APP_INITIALIZER, ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
  ApsAdditionalEntityCollectionReducerMethodsFactory,
  ApsAdditionalPropertyPersistenceResultHandler,
} from '@arphase/ui/data';
import { AuthEffects, AuthState, fromAuth, TokenInterceptorService } from '@innovatech/ui/auth/data';
import {
  entityConfig,
  HttpProxyService,
  INNOVATECH_CONFIGURATION,
  InnovatechConfiguration,
} from '@innovatech/ui/core/data';
import { EntityCollectionReducerMethodsFactory, EntityDataModule, PersistenceResultHandler } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as Sentry from '@sentry/angular';
import { es as esDate } from 'date-fns/locale';
import { es_ES, NZ_DATE_LOCALE, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(es);

const INNOVATECH_CONFIGURATION_VALUE: InnovatechConfiguration = {
  apiUrl: environment.apiUrl,
  version: environment.version,
};

export const reducers: ActionReducerMap<{ auth: AuthState; router: RouterReducerState }> = {
  auth: fromAuth.reducer,
  router: routerReducer,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NzModalModule,
    NzMessageModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Innovatech',
      maxAge: 25,
    connectInZone: true}),
    EffectsModule.forRoot([AuthEffects]),
    EntityDataModule.forRoot(entityConfig),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
    { provide: INNOVATECH_CONFIGURATION, useValue: INNOVATECH_CONFIGURATION_VALUE },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: NZ_DATE_LOCALE, useValue: esDate },
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
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
