import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ProductDetailService } from './product-detail.service';

describe('ProductDetailService', () => {
  let spectator: SpectatorService<ProductDetailService>;
  const createService = createServiceFactory({
    service: ProductDetailService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
