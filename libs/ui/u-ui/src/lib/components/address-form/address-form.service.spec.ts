import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';

import { IvtAddressFormService } from './address-form.service';

describe('IvtAddressFormService', () => {
  let spectator: SpectatorService<IvtAddressFormService>;
  const createService = createServiceFactory({
    service: IvtAddressFormService,
    imports: [HttpClientTestingModule],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
