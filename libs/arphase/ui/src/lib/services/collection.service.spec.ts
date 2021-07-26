import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { ApsCollectionService } from './collection.service';

describe('ApsCollectionService', () => {
  let spectator: SpectatorService<ApsCollectionService<unknown>>;
  const createService = createServiceFactory({
    service: ApsCollectionService,
    providers: [
      { provide: String, useValue: '' },
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
