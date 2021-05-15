import { RevisionRequestCollectionService } from '@ivt/u-state';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { RevisionRequestResolverService } from './revision-request-resolver.service';

describe('RevisionRequestResolverService', () => {
  let spectator: SpectatorService<RevisionRequestResolverService>;
  const createService = createServiceFactory({
    service: RevisionRequestResolverService,
    mocks: [RevisionRequestCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
