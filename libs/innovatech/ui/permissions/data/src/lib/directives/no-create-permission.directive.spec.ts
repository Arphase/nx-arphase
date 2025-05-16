import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { NoCreatePermissionDirective } from './no-create-permission.directive';
import { Component } from '@angular/core';

describe('NoCreatePermissionDirective', () => {
  @Component({ selector: 'ivt-test', standalone: false })
  class HostComponent {}

  let spectator: SpectatorDirective<NoCreatePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: NoCreatePermissionDirective,
    host: HostComponent,
    providers: [
      { provide: REQUIRED_ROLES, useValue: [] },
      { provide: PermissionService, useValue: { hasCreatePermission: jest.fn().mockReturnValue(of(true)) } },
    ],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtNoCreatePermission></div>`);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
