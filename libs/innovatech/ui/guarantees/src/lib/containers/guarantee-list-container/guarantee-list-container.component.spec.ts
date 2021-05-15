import { RouterTestingModule } from '@angular/router/testing';
import {
  CompanyCollectionService,
  GuaranteeCollectionService,
  GuaranteeDataService,
  IdentityFilterService,
  PaymentOrderCollectionService,
  PaymentOrderDataService,
  PermissionService,
  ProductCollectionService,
  VehicleCollectionService,
} from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { GuaranteeListContainerComponent } from './guarantee-list-container.component';

describe('GuaranteeListContainerComponent', () => {
  let spectator: Spectator<GuaranteeListContainerComponent>;
  const createComponent = createComponentFactory({
    component: GuaranteeListContainerComponent,
    shallow: true,
    imports: [RouterTestingModule],
    providers: [provideMockStore()],
    mocks: [
      GuaranteeCollectionService,
      GuaranteeDataService,
      PaymentOrderCollectionService,
      PaymentOrderDataService,
      IdentityFilterService,
      NzModalService,
      NzMessageService,
      PermissionService,
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
