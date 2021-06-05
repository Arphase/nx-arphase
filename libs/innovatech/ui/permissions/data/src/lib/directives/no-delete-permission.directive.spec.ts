import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoDeletePermissionDirective } from './no-delete-permission.directive';

describe('NoDeletePermissionDirective', () => {
  let spectator: SpectatorDirective<NoDeletePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoDeletePermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasDeletePermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtNoDeletePermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
