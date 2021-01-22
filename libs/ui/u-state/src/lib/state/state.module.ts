import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { EntityCollectionReducerMethodsFactory, EntityDataModule, EntityDataService } from '@ngrx/data';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AuthEffects } from '../auth/state';
import { CompanyDataService } from '../companies';
import { HttpProxyService, IvtDataService } from '../core';
import { TokenInterceptor } from '../core/interceptors/token-interceptor';
import { AdditionalEntityCollectionReducerMethodsFactory } from '../entities';
import { entityConfig } from '../entities/entity.metadata';
import { GroupDataService } from '../groups/services/group-data.service';
import { GuaranteeDataService } from '../guarantees/services/guarantee-data.service';
import { PaymentOrderDataService } from '../payment-orders';
import { ProductDataService } from '../products';
import { RevisionDataService } from '../revisions';
import { UserDataService } from '../users';
import { VehicleDataService } from '../vehicles/services/vehicle-data.service';
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
  ],
})
export class IvtStateModule {
  constructor(
    entityDataService: EntityDataService,
    companyDataService: CompanyDataService,
    groupDataService: GroupDataService,
    guaranteeDataService: GuaranteeDataService,
    paymentOrderDataService: PaymentOrderDataService,
    productDataService: ProductDataService,
    revisionDataService: RevisionDataService,
    userDataService: UserDataService,
    vehicleDataService: VehicleDataService
  ) {
    const services: Record<string, IvtDataService<unknown>> = {
      Company: companyDataService,
      Group: groupDataService,
      Guarantee: guaranteeDataService,
      PaymentOrder: paymentOrderDataService,
      Product: productDataService,
      Revision: revisionDataService,
      User: userDataService,
      Vehicle: vehicleDataService,
    };
    entityDataService.registerServices(services);
  }
}
