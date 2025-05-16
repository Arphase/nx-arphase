import { RouterTestingModule } from '@angular/router/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { AuthService } from '../services/auth.service';
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
