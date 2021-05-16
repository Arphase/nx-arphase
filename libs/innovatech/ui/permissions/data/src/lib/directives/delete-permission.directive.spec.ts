import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '..';
import { DeletePermissionDirective } from './delete-permission.directive';

describe('DeletePermissionDirective', () => {
  let spectator: SpectatorDirective<DeletePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: DeletePermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasDeletePermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtDeletePermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
