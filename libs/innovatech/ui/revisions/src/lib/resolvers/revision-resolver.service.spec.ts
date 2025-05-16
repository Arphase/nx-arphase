import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { RevisionCollectionService } from '../services/revision-collection.service';
import { RevisionResolverService } from './revision-resolver.service';

describe('RevisionResolverService', () => {
  let spectator: SpectatorService<RevisionResolverService>;
  const createService = createServiceFactory({
    service: RevisionResolverService,
    mocks: [RevisionCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
