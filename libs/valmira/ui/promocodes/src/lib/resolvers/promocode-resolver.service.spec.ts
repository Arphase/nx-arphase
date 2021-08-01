import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { PromocodeCollectionService } from '../services/promocode-collection.service';
import { PromocodeResolverService } from './promocode-resolver.service';

describe('PromocodeResolverService', () => {
  let spectator: SpectatorService<PromocodeResolverService>;
  const createService = createServiceFactory({
    service: PromocodeResolverService,
    mocks: [PromocodeCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
