import { CategoryCollectionService } from '@musicr/ui/categories/data';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { CategoryResolverService } from './category-resolver.service';

describe('CategoryResolverService', () => {
  let spectator: SpectatorService<CategoryResolverService>;
  const createService = createServiceFactory({
    service: CategoryResolverService,
    mocks: [CategoryCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
