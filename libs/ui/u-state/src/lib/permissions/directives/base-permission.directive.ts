import { Directive, Inject, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PermissionTypes } from '../enums/permission-types.enum';
import { PermissionService, REQUIRED_PERMISSIONS } from '../services/permission.service';

@Directive({
  selector: '[ivtBasePermission]',
})
export class BasePermissionDirective implements OnInit, OnDestroy {
  protected hasPermission$: Observable<boolean>;
  private hasView = false;
  private destroy$ = new Subject<void>();

  constructor(
    protected templateRef: TemplateRef<any>,
    public viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Inject(REQUIRED_PERMISSIONS)
    protected requiredPermissionTypes: PermissionTypes[]
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
