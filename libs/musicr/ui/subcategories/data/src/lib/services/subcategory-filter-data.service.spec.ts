import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpUrlGenerator } from '@ngrx/data';

import { SubcategoryFilterDataService } from './subcategory-filter-data.service';

describe('SubcategoryFilterDataService', () => {
  let spectator: SpectatorService<SubcategoryFilterDataService>;
  const createService = createServiceFactory({
    service: SubcategoryFilterDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
