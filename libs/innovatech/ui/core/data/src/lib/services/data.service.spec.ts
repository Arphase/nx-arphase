import { HttpClientTestingModule } from '@angular/common/http/testing';
import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { DefaultDataServiceFactory, HttpUrlGenerator } from '@ngrx/data';

import { IvtDataService } from './data.service';

describe('IvtDataService', () => {
  let spectator: SpectatorService<IvtDataService<unknown>>;
  const createService = createServiceFactory({
    service: IvtDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
