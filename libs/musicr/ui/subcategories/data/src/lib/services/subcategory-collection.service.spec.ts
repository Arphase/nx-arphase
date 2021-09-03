import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { SubcategoryCollectionService } from './subcategory-collection.service';

describe('SubcategoryCollectionService', () => {
  let spectator: SpectatorService<SubcategoryCollectionService>;
  const createService = createServiceFactory({
    service: SubcategoryCollectionService,
    providers: [
      {
        provide: EntityCollectionServiceElementsFactory,
        useValue: {
          create: () => ({
            dispatcher: {},
            selectors$: { collection$: of({}), entities$: of({}) },
          }),
        },
      },
    ],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
