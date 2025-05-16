import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { ReservationCollectionService } from './reservation-collection.service';

describe('ReservationCollectionService', () => {
  let spectator: SpectatorService<ReservationCollectionService>;
  const createService = createServiceFactory({
    service: ReservationCollectionService,
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
