import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '..';
import { ReadPermissionDirective } from './read-permission.directive';

describe('ReadPermissionDirective', () => {
  let spectator: SpectatorDirective<ReadPermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: ReadPermissionDirective,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasReadPermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtReadPermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
