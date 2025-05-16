import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { Component } from '@angular/core';
import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoDeletePermissionDirective } from './no-delete-permission.directive';

describe('NoDeletePermissionDirective', () => {
  @Component({ selector: 'ivt-test', standalone: false })
  class HostComponent {}

  let spectator: SpectatorDirective<NoDeletePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoDeletePermissionDirective,
    host: HostComponent,
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
