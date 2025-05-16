import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';

import { GuaranteeCollectionService } from '../../services/guarantee-collection.service';
import { PaymentOrderCollectionService } from '../../services/payment-order-collection.service';
import { PaymentOrderDataService } from '../../services/payment-order-data.service';
import { PaymentOrderDialogContainerComponent } from './payment-order-dialog-container.component';

describe('PaymentOrderDialogContainerComponent', () => {
  let spectator: Spectator<PaymentOrderDialogContainerComponent>;
  const createComponent = createComponentFactory({
    component: PaymentOrderDialogContainerComponent,
    shallow: true,
    providers: [{ provide: NZ_MODAL_DATA, useValue: { data: [] } }],
    mocks: [
      PaymentOrderCollectionService,
      GuaranteeCollectionService,
      NzModalRef,
      NzMessageService,
      PaymentOrderDataService,
    ],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
