import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { provideMockStore } from '@ngrx/store/testing';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { GuaranteeCollectionService } from '../../services/guarantee-collection.service';
import { GuaranteeDataService } from '../../services/guarantee-data.service';
import { PaymentOrderCollectionService } from '../../services/payment-order-collection.service';
import { PaymentOrderDataService } from '../../services/payment-order-data.service';
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
      NzModalService,
      NzMessageService,
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
