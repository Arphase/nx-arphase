import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { GtagService } from '@arphase/ui/gtag';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { CartService } from './cart.service';

describe('CartService', () => {
  let spectator: SpectatorService<CartService>;
  const createService = createServiceFactory({
    service: CartService,
    imports: [HttpClientTestingModule, RouterTestingModule],
    mocks: [GtagService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
