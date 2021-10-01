import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { CartService } from './cart.service';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory({
    service: CartService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
