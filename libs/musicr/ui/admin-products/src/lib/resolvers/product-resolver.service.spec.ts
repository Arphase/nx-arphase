import { ProductCollectionService } from '@musicr/ui/products/data';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ProductResolverService } from './product-resolver.service';

describe('ProductResolverService', () => {
  let spectator: SpectatorService<ProductResolverService>;
  const createService = createServiceFactory({
    service: ProductResolverService,
    mocks: [ProductCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
