import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpUrlGenerator } from '@ngrx/data';

import { ProductDataService } from './product-data.service';

describe('ProductDataService', () => {
  let spectator: SpectatorService<ProductDataService>;
  const createService = createServiceFactory({
    service: ProductDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
