import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { PlaceCollectionService } from '../services/place-collection.service';
import { PlaceResolverService } from './place-resolver.service';

describe('PlaceResolverService', () => {
  let spectator: SpectatorService<PlaceResolverService>;
  const createService = createServiceFactory({
    service: PlaceResolverService,
    mocks: [PlaceCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});