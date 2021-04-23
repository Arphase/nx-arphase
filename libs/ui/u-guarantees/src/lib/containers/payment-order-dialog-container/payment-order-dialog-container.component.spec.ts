import { GuaranteeCollectionService, PaymentOrderCollectionService, PaymentOrderDataService } from '@ivt/u-state';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

import { PaymentOrderDialogContainerComponent } from './payment-order-dialog-container.component';

describe('PaymentOrderDialogContainerComponent', () => {
  let spectator: Spectator<PaymentOrderDialogContainerComponent>;
  const createComponent = createComponentFactory({
    component: PaymentOrderDialogContainerComponent,
    shallow: true,
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
