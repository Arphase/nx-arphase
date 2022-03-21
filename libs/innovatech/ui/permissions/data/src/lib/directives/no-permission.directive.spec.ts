import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoPermissionDirective } from './no-permission.directive';

describe('NoPermissionDirective', () => {
  let spectator: SpectatorDirective<NoPermissionDirective>;

  const createDirective = createDirectiveFactory({
    directive: NoPermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasDeletePermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtNoPermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
