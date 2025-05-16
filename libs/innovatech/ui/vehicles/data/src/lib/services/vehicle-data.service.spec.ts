import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { HttpUrlGenerator } from '@ngrx/data';

import { VehicleDataService } from './vehicle-data.service';

describe('VehicleDataService', () => {
  let spectator: SpectatorService<VehicleDataService>;
  const createService = createServiceFactory({
    service: VehicleDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
