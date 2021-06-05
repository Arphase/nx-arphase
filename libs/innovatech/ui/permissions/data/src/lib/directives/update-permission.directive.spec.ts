import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { UpdatePermissionDirective } from './update-permission.directive';

describe('UpdatePermissionDirective', () => {
  let spectator: SpectatorDirective<UpdatePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: UpdatePermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasUpdatePermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtUpdatePermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
