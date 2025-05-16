import { createComponentFactory, Spectator } from '@ngneat/spectator/jest';

import { PaymentMethodComponent } from './payment-method.component';

describe('PaymentMethodComponent', () => {
  let spectator: Spectator<PaymentMethodComponent>;
  const createComponent = createComponentFactory({
    component: PaymentMethodComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
