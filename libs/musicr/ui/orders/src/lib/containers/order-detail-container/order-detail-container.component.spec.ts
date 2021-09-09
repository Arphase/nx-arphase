import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { OrderDetailContainerComponent } from './order-detail-container.component';

describe('OrderDetailContainerComponent', () => {
  let spectator: Spectator<OrderDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: OrderDetailContainerComponent,
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
