import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { RevisionRequestCollectionService } from '../services/revision-request-collection.service';

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
