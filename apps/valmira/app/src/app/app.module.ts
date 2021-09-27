import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import es from '@angular/common/locales/es';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  ApsAdditionalEntityCollectionReducerMethodsFactory,
  ApsAdditionalPropertyPersistenceResultHandler,
} from '@arphase/ui/core';
import { EntityCollectionReducerMethodsFactory, EntityDataModule, PersistenceResultHandler } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer, RouterReducerState, StoreRouterConnectingModule } from '@ngrx/router-store';
import { ActionReducerMap, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import {
  entityConfig,
  FooterModule,
  HttpProxyService,
  MenuModule,
  VALMIRA_CONFIGURATION,
  ValmiraConfiguration,
} from '@valmira/ui/core';
import { es_ES, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NgxMaskModule } from 'ngx-mask';
import { NgxStripeModule } from 'ngx-stripe';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

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
    BrowserModule,
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
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: ApsAdditionalEntityCollectionReducerMethodsFactory,
    },
    {
      provide: PersistenceResultHandler,
      useClass: ApsAdditionalPropertyPersistenceResultHandler,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
