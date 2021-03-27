import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@ivt/c-data';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

@Directive({
  selector: '[ivtReadPermission]',
})
export class ReadPermissionDirective extends BasePermissionDirective {
  hasPermission$ = this.permissionService.hasReadPermission(this.requiredRoles);

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
