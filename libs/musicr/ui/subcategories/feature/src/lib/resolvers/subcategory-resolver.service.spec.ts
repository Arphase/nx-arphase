import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { SubcategoryResolverService } from './subcategory-resolver.service';

describe('SubcategoryResolverService', () => {
  let spectator: SpectatorService<SubcategoryResolverService>;
  const createService = createServiceFactory({
    service: SubcategoryResolverService,
    mocks: [SubcategoryCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
