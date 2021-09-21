import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PaymentMethodTabContainerComponent } from './payment-method-tab-container.component';

describe('PaymentMethodTabContainerComponent', () => {
  let spectator: Spectator<PaymentMethodTabContainerComponent>;
  const createComponent = createComponentFactory({
    component: PaymentMethodTabContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
