import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthEffects } from '@innovatech/ui/auth/data-access';
import {
  EntityCollectionReducerMethodsFactory,
  EntityDataModule,
  EntityDataService,
  PersistenceResultHandler,
} from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { NzMessageModule } from 'ng-zorro-antd/message';

import { CompanyDataService } from '../companies';
import { HttpProxyService, IvtDataService } from '../core';
import { AdditionalEntityCollectionReducerMethodsFactory } from '../entities';
import { entityConfig } from '../entities/entity.metadata';
import { AdditionalPropertyPersistenceResultHandler } from '../entities/results.handler';
import { CompanyFilterDataService } from '../identity-filter/services/companies/company-filter-data.service';
import { GroupFilterDataService } from '../identity-filter/services/groups/group-filter-data.service';
import { UserFilterDataService } from '../identity-filter/services/users/user-filter-data.service';
import { PaymentOrderDataService } from '../payment-orders';
import { reducers } from './reducers';

@NgModule({
  imports: [
    NzMessageModule,
    StoreModule.forRoot(reducers),
    StoreDevtoolsModule.instrument({
      name: 'IVT UI',
      maxAge: 25,
    }),
    EffectsModule.forRoot([AuthEffects]),
    EntityDataModule.forRoot(entityConfig),
    StoreRouterConnectingModule.forRoot({ stateKey: 'router' }),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpProxyService, multi: true },
    {
      provide: EntityCollectionReducerMethodsFactory,
      useClass: AdditionalEntityCollectionReducerMethodsFactory,
    },
    {
      provide: PersistenceResultHandler,
      useClass: AdditionalPropertyPersistenceResultHandler,
    },
  ],
})
export class IvtStateModule {
  constructor(
    entityDataService: EntityDataService,
    companyDataService: CompanyDataService,
    companyFilterDataService: CompanyFilterDataService,
    groupFilterDataService: GroupFilterDataService,
    paymentOrderDataService: PaymentOrderDataService,
    userFilterDataService: UserFilterDataService
  ) {
    const services: Record<string, IvtDataService<unknown>> = {
      Company: companyDataService,
      CompanyFilter: companyFilterDataService,
      GroupFilter: groupFilterDataService,
      PaymentOrder: paymentOrderDataService,
      UserFilter: userFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}
