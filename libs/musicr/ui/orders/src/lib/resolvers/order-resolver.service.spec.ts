import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { OrderCollectionService } from '../services/order-collection.service';
import { OrderResolverService } from './order-resolver.service';

describe('OrderResolverService', () => {
  let spectator: SpectatorService<OrderResolverService>;
  const createService = createServiceFactory({
    service: OrderResolverService,
    mocks: [OrderCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
