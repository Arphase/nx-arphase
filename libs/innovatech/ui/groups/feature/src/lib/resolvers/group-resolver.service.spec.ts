import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { GroupResolverService } from './group-resolver.service';

describe('GroupResolverService', () => {
  let spectator: SpectatorService<GroupResolverService>;
  const createService = createServiceFactory({
    service: GroupResolverService,
    mocks: [GroupCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
