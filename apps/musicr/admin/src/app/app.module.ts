import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import {
  ApsAdditionalEntityCollectionReducerMethodsFactory,
  ApsAdditionalPropertyPersistenceResultHandler,
} from '@arphase/ui/data';
import { AuthEffects, AuthState, fromAuth, TokenInterceptorService } from '@musicr/ui/auth/data';
import {
  entityConfig,
  HttpProxyService,
  MUSIC_REVOLUTION_CONFIGURATION,
  MusicRevolutionConfiguration,
} from '@musicr/ui/core';
import { EntityCollectionReducerMethodsFactory, EntityDataModule, PersistenceResultHandler } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import * as Sentry from '@sentry/angular';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { provideEnvironmentNgxMask } from 'ngx-mask';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

registerLocaleData(es);

const MUSIC_REVOLUTION_CONFIGURATION_VALUE: MusicRevolutionConfiguration = {
  apiUrl: environment.apiUrl,
  version: environment.version,
  innovatechUrl: environment.innovatechUrl,
};

export const reducers: ActionReducerMap<{ auth: AuthState; router: RouterReducerState }> = {
  auth: fromAuth.reducer,
  router: routerReducer,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    NzModalModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'Music Revolution',
      maxAge: 25,
      connectInZone: true,
    }),
    EffectsModule.forRoot([AuthEffects]),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
    EntityDataModule.forRoot(entityConfig),
    NzMessageModule,
  ],
  providers: [
    { provide: MUSIC_REVOLUTION_CONFIGURATION, useValue: MUSIC_REVOLUTION_CONFIGURATION_VALUE },
    { provide: NZ_I18N, useValue: es_ES },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
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
    provideEnvironmentNgxMask(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
