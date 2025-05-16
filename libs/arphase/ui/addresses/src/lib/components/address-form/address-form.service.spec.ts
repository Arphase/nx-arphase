import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';

import { ApsAddressFormService } from './address-form.service';

describe('ApsAddressFormService', () => {
  let spectator: SpectatorService<ApsAddressFormService>;
  const createService = createServiceFactory({
    service: ApsAddressFormService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
