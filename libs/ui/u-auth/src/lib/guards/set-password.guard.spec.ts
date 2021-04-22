import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { SetPasswordGuard } from './set-password.guard';

describe('SetPasswordGuard', () => {
  let spectator: SpectatorService<SetPasswordGuard>;
  const createService = createServiceFactory({
    service: SetPasswordGuard,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });
});
