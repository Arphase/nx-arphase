import { VehicleCollectionService } from '@innovatech/ui/vehicles/data';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { VehicleResolverService } from './vehicle-resolver.service';

describe('VehicleResolverService', () => {
  let spectator: SpectatorService<VehicleResolverService>;
  const createService = createServiceFactory({
    service: VehicleResolverService,
    mocks: [VehicleCollectionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
