import { HttpClientTestingModule } from '@angular/common/http/testing';
import { GroupFilterDataService } from './group-filter-data.service';
import { SpectatorService, createServiceFactory } from '@ngneat/spectator';
import { HttpUrlGenerator } from '@ngrx/data';

describe('GroupFilterDataService', () => {
  let spectator: SpectatorService<GroupFilterDataService>;
  const createService = createServiceFactory({
    service: GroupFilterDataService,
    imports: [HttpClientTestingModule],
    providers: [{ provide: HttpUrlGenerator, useValue: { entityResource: jest.fn(), collectionResource: jest.fn() } }],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
