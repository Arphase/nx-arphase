import { createServiceFactory, SpectatorService } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService } from '../../permissions';
import { CompanyFilterCollectionService } from './companies';
import { GroupFilterCollectionService } from './groups';
import { IdentityFilterService } from './identity-filter.service';
import { UserFilterCollectionService } from './users';

describe('IdentityFilterService', () => {
  const collectionServiceMock = { store: of({}), selectors: { selectCollection: '' } };

  let spectator: SpectatorService<IdentityFilterService>;
  const createService = createServiceFactory({
    service: IdentityFilterService,
    providers: [
      { provide: GroupFilterCollectionService, useValue: collectionServiceMock },
      { provide: CompanyFilterCollectionService, useValue: collectionServiceMock },
      { provide: UserFilterCollectionService, useValue: collectionServiceMock },
    ],
    mocks: [PermissionService],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
