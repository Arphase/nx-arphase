import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { DeleteLocalStorageGuard } from './delete-local-storage.guard';

describe('DeleteLocalStorageGuard', () => {
  let spectator: SpectatorService<DeleteLocalStorageGuard>;
  const createService = createServiceFactory({
    service: DeleteLocalStorageGuard,
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
