import {
  Directive,
  Inject,
  Input,
  OnChanges,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserRoles } from '@innovatech/common/domain';
import { map, switchMap } from 'rxjs/operators';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';
import { BasePermissionDirective } from './base-permission.directive';

@Directive({
    selector: '[ivtNoPermission]',
    standalone: false
})
export class NoPermissionDirective extends BasePermissionDirective implements OnChanges {
  @Input() ivtNoPermission: UserRoles[] = [];
  hasPermission$ = this.requiredRoles$.pipe(
    switchMap(requiredRoles => this.permissionService.hasPermission(requiredRoles)),
    map(hasPermission => !hasPermission)
  );

  constructor(
    protected templateRef: TemplateRef<null>,
    protected viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Optional() @Inject(REQUIRED_ROLES) protected requiredRoles: UserRoles[]
  ) {
    super(templateRef, viewContainer, permissionService, requiredRoles);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ivtNoPermission && this.ivtNoPermission) {
      this.requiredRolesSubject.next([...(this.requiredRoles ?? []), ...this.ivtNoPermission]);
    }
  }
}
