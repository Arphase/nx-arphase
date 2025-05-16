import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { PriceOptionCollectionService } from './price-option-collection.service';

describe('PriceOptionCollectionService', () => {
  let spectator: SpectatorService<PriceOptionCollectionService>;
  const createService = createServiceFactory({
    service: PriceOptionCollectionService,
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
