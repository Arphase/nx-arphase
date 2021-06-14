import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoUpdatePermissionDirective } from './no-update-permission.directive';

describe('NoUpdatePermissionDirective', () => {
  let spectator: SpectatorDirective<NoUpdatePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoUpdatePermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasUpdatePermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtNoUpdatePermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
