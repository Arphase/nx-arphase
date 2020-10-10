import { Directive, Inject, TemplateRef, ViewContainerRef } from '@angular/core';

import { PermissionTypes } from '../enums/permission-types.enum';
import { PermissionService, REQUIRED_PERMISSIONS } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

@Directive({
  selector: '[ivtUpdatePermission]',
})
export class UpdatePermissionDirective extends BasePermissionDirective {
  hasPermission$ = this.permissionService.hasUpdatePermission(...this.requiredPermissionTypes);

  constructor(
    protected templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Inject(REQUIRED_PERMISSIONS)
    protected requiredPermissionTypes: PermissionTypes[]
  ) {
    super(templateRef, viewContainer, permissionService, requiredPermissionTypes);
  }
}
