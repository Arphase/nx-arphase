import { Directive, Inject, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@innovatech/common/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';

@UntilDestroy()
@Directive({
  selector: '[ivtBasePermission]',
})
export class BasePermissionDirective implements OnInit {
  hasPermission$: Observable<boolean>;
  private hasView = false;

  constructor(
    protected templateRef: TemplateRef<null>,
    protected viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Inject(REQUIRED_ROLES) protected requiredRoles: UserRoles[]
  ) {}

  ngOnInit() {
    this.hasPermission$.pipe(untilDestroyed(this)).subscribe(hasPermission => this.execute(hasPermission));
  }

  execute(hasPermission: boolean) {
    if (hasPermission && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasPermission && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }
}
