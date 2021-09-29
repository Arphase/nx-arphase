import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ReservationWizardService } from './reservation-wizard.service';

describe('ReservationWizardService', () => {
  let spectator: SpectatorService<ReservationWizardService>;
  const createService = createServiceFactory({
    service: ReservationWizardService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
