import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { VehicleCollectionService } from './vehicle-collection.service';

describe('VehicleCollectionService', () => {
  let spectator: SpectatorService<VehicleCollectionService>;
  const createService = createServiceFactory({
    service: VehicleCollectionService,
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
