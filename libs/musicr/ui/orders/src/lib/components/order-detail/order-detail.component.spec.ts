import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { OrderDetailComponent } from './order-detail.component';

describe('OrderDetailComponent', () => {
  let spectator: Spectator<OrderDetailComponent>;
  const createComponent = createComponentFactory({
    component: OrderDetailComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
