import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { GroupFilterCollectionService } from './group-filter-collection.service';

describe('GroupFilterCollectionService', () => {
  let spectator: SpectatorService<GroupFilterCollectionService>;
  const createService = createServiceFactory({
    service: GroupFilterCollectionService,
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
