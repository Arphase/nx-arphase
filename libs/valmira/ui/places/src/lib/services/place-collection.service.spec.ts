import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { PlaceCollectionService } from './place-collection.service';

describe('PlaceCollectionService', () => {
  let spectator: SpectatorService<PlaceCollectionService>;
  const createService = createServiceFactory({
    service: PlaceCollectionService,
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
