import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '..';
import { BasePermissionDirective } from './base-permission.directive';

describe('BasePermissionDirective', () => {
  let spectator: SpectatorDirective<BasePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: BasePermissionDirective,
    providers: [{ provide: REQUIRED_ROLES, useValue: [] }],
    mocks: [PermissionService],
    detectChanges: false,
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtBasePermission></div>`);
    spectator.directive.hasPermission$ = of(true);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});