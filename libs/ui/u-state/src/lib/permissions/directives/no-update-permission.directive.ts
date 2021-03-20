import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@ivt/c-data';
import { map } from 'rxjs/operators';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

@Directive({
  selector: '[ivtNoUpdatePermission]',
})
export class NoUpdatePermissionDirective extends BasePermissionDirective {
  hasPermission$ = this.permissionService
    .hasUpdatePermission(this.requiredRoles)
    .pipe(map(hasPermission => !hasPermission));

  constructor(
    protected templateRef: TemplateRef<null>,
    public viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Inject(REQUIRED_ROLES)
    protected requiredRoles: UserRoles[]
  ) {
    super(templateRef, viewContainer, permissionService, requiredRoles);
  }
}
