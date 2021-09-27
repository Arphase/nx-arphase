import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PaymentMethodTabComponent } from './payment-method-tab.component';

describe('PaymentMethodTabComponent', () => {
  let spectator: Spectator<PaymentMethodTabComponent>;
  const createComponent = createComponentFactory({
    component: PaymentMethodTabComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
