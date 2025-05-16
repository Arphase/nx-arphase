import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { DeletePermissionDirective } from './delete-permission.directive';
import { Component } from '@angular/core';

describe('DeletePermissionDirective', () => {
  @Component({ selector: 'ivt-test', standalone: false })
  class HostComponent {}

  let spectator: SpectatorDirective<DeletePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: DeletePermissionDirective,
    host: HostComponent,
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
