import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductDataService } from '@musicr/ui/products/data';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { OrderFormService } from './order-form.service';

describe('OrderFormService', () => {
  let spectator: SpectatorService<OrderFormService>;
  const createService = createServiceFactory({
    service: OrderFormService,
    imports: [HttpClientTestingModule],
    mocks: [ProductDataService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
