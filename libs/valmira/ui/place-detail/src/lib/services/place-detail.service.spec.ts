import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { PlaceDetailService } from './place-detail.service';

describe('PlaceDetailService', () => {
  let spectator: SpectatorService<PlaceDetailService>;
  const createService = createServiceFactory({
    service: PlaceDetailService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
