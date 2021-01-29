import { Directive, Inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { UserRoles } from '@ivt/c-data';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';

@Directive({
  selector: '[ivtBasePermission]',
})
export class BasePermissionDirective implements OnInit, OnDestroy {
  protected hasPermission$: Observable<boolean>;
  private hasView = false;
  private destroy$ = new Subject<void>();

  constructor(
    protected templateRef: TemplateRef<null>,
    public viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Inject(REQUIRED_ROLES)
    protected requiredRoles: UserRoles[]
  ) {}

  ngOnInit() {
    this.hasPermission$.pipe(takeUntil(this.destroy$)).subscribe(hasPermission => this.execute(hasPermission));
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
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
