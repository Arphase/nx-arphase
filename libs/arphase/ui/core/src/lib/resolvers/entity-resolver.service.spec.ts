import { ApsCollectionService } from '@arphase/ui/data';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ApsEntityResolverService } from './entity-resolver.service';

describe('ApsEntityResolverService', () => {
  let spectator: SpectatorService<ApsEntityResolverService<unknown>>;
  const createService = createServiceFactory({
    service: ApsEntityResolverService,
    mocks: [ApsCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
