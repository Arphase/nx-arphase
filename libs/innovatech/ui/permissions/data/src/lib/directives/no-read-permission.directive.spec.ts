import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoReadPermissionDirective } from './no-read-permission.directive';
import { Component } from '@angular/core';

describe('NoReadPermissionDirective', () => {
  @Component({ selector: 'ivt-test', standalone: false })
  class HostComponent {}

  let spectator: SpectatorDirective<NoReadPermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoReadPermissionDirective,
    host: HostComponent,
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
