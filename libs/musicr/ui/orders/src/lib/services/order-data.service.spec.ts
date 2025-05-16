import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { HttpUrlGenerator } from '@ngrx/data';

import { OrderDataService } from './order-data.service';

describe('OrderDataService', () => {
  let spectator: SpectatorService<OrderDataService>;
  const createService = createServiceFactory({
    service: OrderDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
