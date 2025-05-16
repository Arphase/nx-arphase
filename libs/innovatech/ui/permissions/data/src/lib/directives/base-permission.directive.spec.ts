import { createDirectiveFactory, SpectatorDirective } from '@ngneat/spectator/jest';
import { of } from 'rxjs';

import { Component } from '@angular/core';
import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

describe('BasePermissionDirective', () => {
  @Component({ selector: 'ivt-test', standalone: false })
  class HostComponent {}

  let spectator: SpectatorDirective<BasePermissionDirective>;
  const createDirective = createDirectiveFactory({
    directive: BasePermissionDirective,
    host: HostComponent,
    providers: [{ provide: REQUIRED_ROLES, useValue: [] }],
    mocks: [PermissionService],
  });

  beforeEach(() => {
    spectator = createDirective(`<div *ivtPermission></div>`);
    spectator.directive.hasPermission$ = of(true);
  });

  it('should create', () => {
    expect(spectator.directive).toBeTruthy();
  });
});
