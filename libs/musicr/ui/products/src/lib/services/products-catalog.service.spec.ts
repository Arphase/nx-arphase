import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

import { ProductsCatalogService } from './products-catalog.service';

describe('ProductsCatalogService', () => {
  let spectator: SpectatorService<ProductsCatalogService>;
  const createService = createServiceFactory({
    service: ProductsCatalogService,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
