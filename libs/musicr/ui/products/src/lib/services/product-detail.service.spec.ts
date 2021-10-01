import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ProductDetailService } from './product-detail.service';

describe('ProductDetailService', () => {
  let spectator: SpectatorService<ProductDetailService>;
  const createService = createServiceFactory({
    service: ProductDetailService,
    imports: [RouterTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
