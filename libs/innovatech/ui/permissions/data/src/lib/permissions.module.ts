import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BasePermissionDirective } from './directives/base-permission.directive';
import { CreatePermissionDirective } from './directives/create-permission.directive';
import { DeletePermissionDirective } from './directives/delete-permission.directive';
import { NoCreatePermissionDirective } from './directives/no-create-permission.directive';
import { NoDeletePermissionDirective } from './directives/no-delete-permission.directive';
import { NoPermissionDirective } from './directives/no-permission.directive';
import { NoReadPermissionDirective } from './directives/no-read-permission.directive';
import { NoUpdatePermissionDirective } from './directives/no-update-permission.directive';
import { ReadPermissionDirective } from './directives/read-permission.directive';
import { UpdatePermissionDirective } from './directives/update-permission.directive';

const directives = [
  BasePermissionDirective,
  CreatePermissionDirective,
  UpdatePermissionDirective,
  ReadPermissionDirective,
  DeletePermissionDirective,
  NoCreatePermissionDirective,
  NoDeletePermissionDirective,
  NoReadPermissionDirective,
  NoUpdatePermissionDirective,
  NoPermissionDirective,
];

@NgModule({
  declarations: [directives],
  imports: [CommonModule],
  exports: [directives],
})
export class PermissionsModule {}
