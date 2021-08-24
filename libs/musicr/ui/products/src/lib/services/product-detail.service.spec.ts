import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

import { ProductDetailService } from './product-detail.service';

describe('ProductDetailService', () => {
  let spectator: SpectatorService<ProductDetailService>;
  const createService = createServiceFactory({
    service: ProductDetailService,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
