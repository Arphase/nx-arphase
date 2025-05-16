import { createServiceFactory, SpectatorService } from '@ngneat/spectator/jest';
import { provideMockStore } from '@ngrx/store/testing';

import { PermissionService } from './permission.service';

describe('PermissionService', () => {
  let spectator: SpectatorService<PermissionService>;
  const createService = createServiceFactory({
    service: PermissionService,
    providers: [provideMockStore()],
  });

  beforeEach(() => (spectator = createService()));

  it('should create', () => {
    expect(spectator.service).toBeTruthy();
  });
});
