import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
  DefaultDataServiceConfig,
  EntityCollectionReducerMethodsFactory,
  EntityDataModule,
  EntityDataService,
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from './auth/state';
import { IvtDataService } from './core';
import { TokenInterceptor } from './core/interceptors/token-interceptor';
import { AdditionalEntityCollectionReducerMethodsFactory } from './entities';
import { entityConfig } from './entities/entity.metadata';
import { GuaranteeDataService } from './guarantees/services/guarantee-data.service';
import { PaymentOrderDataService } from './payment-orders';
import { reducers } from './reducers';

@NgModule({
  imports: [
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'IVT UI',
      maxAge: 25,
    }),
    EffectsModule.forRoot([AuthEffects]),
    EntityDataModule.forRoot(entityConfig),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory,
    },
  ],
})
export class IvtStateModule {
  constructor(
    entityDataService: EntityDataService,
    guaranteeDataService: GuaranteeDataService,
    paymentOrderDataService: PaymentOrderDataService
  ) {
    const services: Record<string, IvtDataService> = {
      Guarantee: guaranteeDataService,
      PaymentOrder: paymentOrderDataService,
    };
    entityDataService.registerServices(services);
  }
}