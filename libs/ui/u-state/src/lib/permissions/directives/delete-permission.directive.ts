import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@ivt/c-data';

import { BasePermissionDirective } from './base-permission.directive';
import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';

@Directive({
  selector: '[ivtDeletePermission]',
})
export class DeletePermissionDirective extends BasePermissionDirective {
  hasPermission$ = this.permissionService.hasDeletePermission(this.requiredRoles);

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
