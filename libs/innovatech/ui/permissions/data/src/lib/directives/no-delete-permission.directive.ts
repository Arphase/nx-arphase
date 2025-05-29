import { Directive, Inject, Optional, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@innovatech/common/domain';
import { map, switchMap } from 'rxjs/operators';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

@Directive({
  selector: '[ivtNoDeletePermission]',
  standalone: false,
})
export class NoDeletePermissionDirective extends BasePermissionDirective {
  hasPermission$ = this.requiredRoles$.pipe(
    switchMap(requiredRoles => this.permissionService.hasDeletePermission(requiredRoles)),
    map(hasPermission => !hasPermission),
  );

  constructor(
    protected templateRef: TemplateRef<null>,
    protected viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Optional() @Inject(REQUIRED_ROLES) protected requiredRoles: UserRoles[],
  ) {
    super(templateRef, viewContainer, permissionService, requiredRoles);
  }
}
