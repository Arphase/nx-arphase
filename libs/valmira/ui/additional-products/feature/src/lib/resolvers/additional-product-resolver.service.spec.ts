import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { AdditionalProductCollectionService } from '@valmira/ui/additional-products/data';

import { AdditionalProductResolverService } from './additional-product-resolver.service';

describe('AdditionalProductResolverService', () => {
  let spectator: SpectatorService<AdditionalProductResolverService>;
  const createService = createServiceFactory({
    service: AdditionalProductResolverService,
    mocks: [AdditionalProductCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
