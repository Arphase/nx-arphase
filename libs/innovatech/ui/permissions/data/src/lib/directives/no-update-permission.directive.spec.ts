import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { Component } from '@angular/core';
import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoUpdatePermissionDirective } from './no-update-permission.directive';

describe('NoUpdatePermissionDirective', () => {
  @Component({ selector: 'ivt-test', standalone: false })
  class HostComponent {}

  let spectator: SpectatorDirective<NoUpdatePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoUpdatePermissionDirective,
    host: HostComponent,
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
