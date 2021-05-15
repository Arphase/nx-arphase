import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
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

import { AuthEffects } from '../auth/state';
import { CompanyDataService } from '../companies';
import { HttpProxyService, IvtDataService } from '../core';
import { TokenInterceptor } from '../core/interceptors/token-interceptor';
import { AdditionalEntityCollectionReducerMethodsFactory } from '../entities';
import { entityConfig } from '../entities/entity.metadata';
import { AdditionalPropertyPersistenceResultHandler } from '../entities/results.handler';
import { GroupDataService } from '../groups/services/group-data.service';
import { CompanyFilterDataService } from '../identity-filter/services/companies/company-filter-data.service';
import { GroupFilterDataService } from '../identity-filter/services/groups/group-filter-data.service';
import { UserFilterDataService } from '../identity-filter/services/users/user-filter-data.service';
import { PaymentOrderDataService } from '../payment-orders';
import { ProductDataService } from '../products';
import { UserDataService } from '../users';
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
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
    groupDataService: GroupDataService,
    groupFilterDataService: GroupFilterDataService,
    paymentOrderDataService: PaymentOrderDataService,
    productDataService: ProductDataService,
    userDataService: UserDataService,
    userFilterDataService: UserFilterDataService
  ) {
    const services: Record<string, IvtDataService<unknown>> = {
      Company: companyDataService,
      CompanyFilter: companyFilterDataService,
      Group: groupDataService,
      GroupFilter: groupFilterDataService,
      PaymentOrder: paymentOrderDataService,
      Product: productDataService,
      User: userDataService,
      UserFilter: userFilterDataService,
    };
    entityDataService.registerServices(services);
  }
}
