import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';

import { ProductDetailService } from './product-detail.service';

describe('ProductDetailService', () => {
  let spectator: SpectatorService<ProductDetailService>;
  const createService = createServiceFactory({
    service: ProductDetailService,
    imports: [HttpClientTestingModule, RouterTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
