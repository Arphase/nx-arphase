import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MenuItem, SpaLayoutOptions } from '@arphase/ui/core';
import { UserRoles } from '@innovatech/common/domain';
import { fromAuth, getAuthUserEmailState, getAuthUserNameState } from '@innovatech/ui/auth/data';
import { INNOVATECH_CONFIGURATION, InnovatechConfiguration } from '@innovatech/ui/core/data';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent implements OnInit {
  options: SpaLayoutOptions = {
    logoUrl: 'assets/img/logo-white.svg',
    show: {
      darkModeToggle: true,
    },
  };
  menuItems: MenuItem[] = [
    {
      icon: 'pie-chart',
      header: 'Dashboard',
      path: ['dashboard'],
      cy: 'dashboard',
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin, UserRoles.agencyUser]),
    },
    {
      icon: 'file-text',
      header: 'Garantías',
      path: ['guarantees'],
      cy: 'guarantees',
      display$: this.permissionService.hasReadPermission([
        UserRoles.superAdmin,
        UserRoles.agencyUser,
        UserRoles.repairman,
      ]),
    },
    {
      icon: 'usergroup-add',
      header: 'Grupos',
      path: ['groups'],
      cy: 'groups',
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin]),
    },
    {
      icon: 'barcode',
      header: 'Productos',
      path: ['products'],
      cy: 'products',
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin]),
    },
    {
      icon: 'user',
      header: 'Usuarios',
      path: ['users'],
      cy: 'users',
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin]),
    },
    {
      icon: 'car',
      header: 'Vehículos',
      path: ['vehicles'],
      cy: 'vehicles',
      display$: this.permissionService.hasReadPermission([
        UserRoles.superAdmin,
        UserRoles.agencyUser,
        UserRoles.repairman,
      ]),
    },
    {
      icon: 'tool',
      header: 'Revisiones',
      path: ['revisions'],
      cy: 'revisions',
      display$: this.permissionService.hasReadPermission([
        UserRoles.superAdmin,
        UserRoles.agencyUser,
        UserRoles.repairman,
      ]),
    },
    {
      icon: 'container',
      header: 'Solicitudes',
      path: ['revision-requests'],
      cy: 'revision-requests',
      display$: this.permissionService.hasReadPermission([
        UserRoles.superAdmin,
        UserRoles.agencyUser,
        UserRoles.repairman,
      ]),
    },
  ];
  name$ = this.store.pipe(select(getAuthUserNameState));
  email$ = this.store.pipe(select(getAuthUserEmailState));
  version = this.config.version;

  constructor(
    private store: Store,
    private permissionService: PermissionService,
    @Inject(INNOVATECH_CONFIGURATION) private config: InnovatechConfiguration,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.actions$.pipe(ofType(fromAuth.actions.loadUserFromStorage), take(1)).subscribe(({ user }) => {
      if (!user?.token) {
        this.store.dispatch(fromAuth.actions.logout());
      }
    });
  }

  logout(): void {
    this.store.dispatch(fromAuth.actions.logout());
  }
}
