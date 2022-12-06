import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { AdditionalOptionCollectionService } from './additional-option-collection.service';

describe('AdditionalOptionCollectionService', () => {
  let spectator: SpectatorService<AdditionalOptionCollectionService>;
  const createService = createServiceFactory({
    service: AdditionalOptionCollectionService,
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
