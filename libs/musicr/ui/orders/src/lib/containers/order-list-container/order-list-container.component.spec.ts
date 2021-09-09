import { createComponentFactory, Spectator } from '@ngneat/spectator';

import { OrderCollectionService } from '../../services/order-collection.service';
import { OrderDataService } from '../../services/order-data.service';
import { OrderListContainerComponent } from './order-list-container.component';

describe('OrderListContainerComponent', () => {
  let spectator: Spectator<OrderListContainerComponent>;
  const createComponent = createComponentFactory({
    component: OrderListContainerComponent,
    shallow: true,
    mocks: [OrderCollectionService, OrderDataService],
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
