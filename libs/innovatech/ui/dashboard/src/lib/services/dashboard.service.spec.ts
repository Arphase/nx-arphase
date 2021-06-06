import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let spectator: SpectatorService<DashboardService>;
  const createService = createServiceFactory({
    service: DashboardService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should be created', () => {
    expect(spectator.service).toBeTruthy();
  });
});
