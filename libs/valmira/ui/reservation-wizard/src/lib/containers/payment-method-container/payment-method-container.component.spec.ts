import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { PaymentMethodContainerComponent } from './payment-method-container.component';

describe('PaymentMethodContainerComponent', () => {
  let spectator: Spectator<PaymentMethodContainerComponent>;
  const createComponent = createComponentFactory({
    component: PaymentMethodContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
