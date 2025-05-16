import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { HttpUrlGenerator } from '@ngrx/data';

import { GuaranteeDataService } from './guarantee-data.service';

describe('GuaranteeDataService', () => {
  let spectator: SpectatorService<GuaranteeDataService>;
  const createService = createServiceFactory({
    service: GuaranteeDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
