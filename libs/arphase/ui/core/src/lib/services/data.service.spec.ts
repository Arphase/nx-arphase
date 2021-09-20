import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { HttpUrlGenerator } from '@ngrx/data';

import { ApsDataService } from './data.service';

describe('ApsDataService', () => {
  let spectator: SpectatorService<ApsDataService<unknown>>;
  const createService = createServiceFactory({
    service: ApsDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
