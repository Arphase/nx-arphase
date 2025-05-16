import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { GroupCollectionService } from './group-collection.service';

describe('GroupCollectionService', () => {
  let spectator: SpectatorService<GroupCollectionService>;
  const createService = createServiceFactory({
    service: GroupCollectionService,
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
