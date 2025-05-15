import {
  Directive,
  Inject,
  Input,
  OnChanges,
  OnInit,
  Optional,
  SimpleChanges,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserRoles } from '@innovatech/common/domain';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { PermissionService, REQUIRED_ROLES } from '../services/permission.service';

@UntilDestroy()
@Directive({
    selector: '[ivtPermission]',
    standalone: false
})
export class BasePermissionDirective implements OnInit, OnChanges {
  @Input() ivtPermission: UserRoles[] = [];
  requiredRolesSubject = new BehaviorSubject<UserRoles[]>(this.requiredRoles ?? []);
  requiredRoles$ = this.requiredRolesSubject.asObservable();
  hasPermission$ = this.requiredRoles$.pipe(
    switchMap(requiredRoles => this.permissionService.hasPermission(requiredRoles))
  );

  private hasView = false;

  constructor(
    protected templateRef: TemplateRef<unknown>,
    protected viewContainer: ViewContainerRef,
    protected permissionService: PermissionService,
    @Optional() @Inject(REQUIRED_ROLES) protected requiredRoles: UserRoles[]
  ) {}

  ngOnInit() {
    this.hasPermission$.pipe(untilDestroyed(this)).subscribe(hasPermission => this.execute(hasPermission));
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.ivtPermission && this.ivtPermission) {
      this.requiredRolesSubject.next([...(this.requiredRoles ?? []), ...this.ivtPermission]);
    }
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
