import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoReadPermissionDirective } from './no-read-permission.directive';

describe('NoReadPermissionDirective', () => {
  let spectator: SpectatorDirective<NoReadPermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoReadPermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasReadPermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtNoReadPermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
