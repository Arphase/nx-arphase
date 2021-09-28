import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ReservationDetailService } from './reservation-detail.service';

describe('ReservationDetailService', () => {
  let spectator: SpectatorService<ReservationDetailService>;

  const createService = createServiceFactory({
    service: ReservationDetailService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
