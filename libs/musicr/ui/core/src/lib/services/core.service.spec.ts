import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { CoreService } from './core.service';

describe('CoreService', () => {
  let spectator: SpectatorService<CoreService>;
  const createService = createServiceFactory({
    service: CoreService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
