import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpUrlGenerator } from '@ngrx/data';

import { CategoryFilterDataService } from './category-filter-data.service';

describe('CategoryFilterDataService', () => {
  let spectator: SpectatorService<CategoryFilterDataService>;
  const createService = createServiceFactory({
    service: CategoryFilterDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
