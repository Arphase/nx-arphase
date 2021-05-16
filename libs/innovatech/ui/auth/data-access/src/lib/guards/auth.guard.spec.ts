import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@ivt/u-state';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let spectator: SpectatorService<AuthGuard>;
  const createService = createServiceFactory({
    service: AuthGuard,
    imports: [RouterTestingModule],
    mocks: [AuthService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
