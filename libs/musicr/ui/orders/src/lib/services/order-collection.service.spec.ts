import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';
import { of } from 'rxjs';

import { OrderCollectionService } from './order-collection.service';

describe('OrderCollectionService', () => {
  let spectator: SpectatorService<OrderCollectionService>;
  const createService = createServiceFactory({
    service: OrderCollectionService,
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
