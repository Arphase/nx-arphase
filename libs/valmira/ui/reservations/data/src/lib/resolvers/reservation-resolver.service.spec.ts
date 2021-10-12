import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { ReservationCollectionService } from '../services/reservation-collection.service';
import { ReservationResolverService } from './reservation-resolver.service';

describe('ReservationResolverService', () => {
  let spectator: SpectatorService<ReservationResolverService>;
  const createService = createServiceFactory({
    service: ReservationResolverService,
    mocks: [ReservationCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
