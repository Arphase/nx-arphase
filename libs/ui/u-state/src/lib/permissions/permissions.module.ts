import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasePermissionDirective } from './directives/base-permission.directive';
import { CreatePermissionDirective } from './directives/create-permission.directive';
import { DeletePermissionDirective } from './directives/delete-permission.directive';
import { ReadPermissionDirective } from './directives/read-permission.directive';
import { UpdatePermissionDirective } from './directives/update-permission.directive';

const directives = [
  BasePermissionDirective,
  CreatePermissionDirective,
  UpdatePermissionDirective,
  ReadPermissionDirective,
  DeletePermissionDirective,
];

@NgModule({
  declarations: [directives],
  imports: [CommonModule],
  exports: [directives],
})
export class PermissionsModule {}
