import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { OrderCollectionService } from '../../services/order-collection.service';
import { OrderDetailContainerComponent } from './order-detail-container.component';

describe('OrderDetailContainerComponent', () => {
  let spectator: Spectator<OrderDetailContainerComponent>;
  const createComponent = createComponentFactory({
    component: OrderDetailContainerComponent,
    mocks: [OrderCollectionService],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
