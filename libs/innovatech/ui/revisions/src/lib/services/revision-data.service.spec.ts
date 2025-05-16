import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { HttpUrlGenerator } from '@ngrx/data';

import { RevisionDataService } from './revision-data.service';

describe('RevisionDataService', () => {
  let spectator: SpectatorService<RevisionDataService>;
  const createService = createServiceFactory({
    service: RevisionDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
