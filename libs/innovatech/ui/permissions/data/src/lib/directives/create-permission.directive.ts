import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@innovatech/common/domain';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

@Directive({
  selector: '[ivtCreatePermission]',
})
export class CreatePermissionDirective extends BasePermissionDirective {
  hasPermission$ = this.permissionService.hasCreatePermission(this.requiredRoles);

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