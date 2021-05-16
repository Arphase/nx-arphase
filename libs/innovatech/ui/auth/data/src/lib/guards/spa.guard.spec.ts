import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@ivt/u-state';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { SpaGuard } from './spa.guard';

describe('SpaGuard', () => {
  let spectator: SpectatorService<SpaGuard>;
  const createService = createServiceFactory({
    service: SpaGuard,
    imports: [RouterTestingModule],
    mocks: [AuthService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
