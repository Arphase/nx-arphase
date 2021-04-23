import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ThemeService } from './theme.service';

describe('ThemeService', () => {
  let spectator: SpectatorService<ThemeService>;
  const createService = createServiceFactory({
    service: ThemeService,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
