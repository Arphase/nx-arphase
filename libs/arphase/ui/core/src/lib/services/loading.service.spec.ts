import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let spectator: SpectatorService<LoadingService>;
  const createService = createServiceFactory({
    service: LoadingService,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
