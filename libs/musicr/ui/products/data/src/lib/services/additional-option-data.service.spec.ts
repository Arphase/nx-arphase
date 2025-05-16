import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { HttpUrlGenerator } from '@ngrx/data';

import { AdditionalOptionDataService } from './additional-option-data.service';

describe('AdditionalOptionDataService', () => {
  let spectator: SpectatorService<AdditionalOptionDataService>;
  const createService = createServiceFactory({
    service: AdditionalOptionDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
