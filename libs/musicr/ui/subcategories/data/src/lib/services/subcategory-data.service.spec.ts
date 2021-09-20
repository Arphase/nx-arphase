import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpUrlGenerator } from '@ngrx/data';

import { SubcategoryDataService } from './subcategory-data.service';

describe('SubcategoryDataService', () => {
  let spectator: SpectatorService<SubcategoryDataService>;
  const createService = createServiceFactory({
    service: SubcategoryDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
