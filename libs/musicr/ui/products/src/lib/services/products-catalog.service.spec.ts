import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

import { ProductsCatalogService } from './products-catalog.service';

describe('ProductsCatalogService', () => {
  let spectator: SpectatorService<ProductsCatalogService>;
  const createService = createServiceFactory({
    service: ProductsCatalogService,
    imports: [HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
