import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { UserFilterCollectionService } from './user-filter-collection.service';

describe('UserFilterCollectionService', () => {
  let spectator: SpectatorService<UserFilterCollectionService>;
  const createService = createServiceFactory({
    service: UserFilterCollectionService,
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
