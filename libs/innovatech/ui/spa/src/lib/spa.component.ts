import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MenuItem, UserRoles } from '@innovatech/common/domain';
import {
  fromAuth,
  getAuthUserEmailState,
  getAuthUserNameState,
  IVT_UI_STATE_CONFIGURATION,
  IvtState,
  IvtUiStateConfiguration,
  PermissionService,
} from '@ivt/u-state';
import { IvtSubscriberComponent, Themes, ThemeService } from '@ivt/u-ui';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { take } from 'rxjs/operators';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent extends IvtSubscriberComponent implements OnInit {
  isCollapsed: boolean;
  menuItems: MenuItem[] = [
    {
      icon: 'pie-chart',
      header: 'Dashboard',
      path: ['dashboard'],
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin, UserRoles.agencyUser]),
    },
    {
      icon: 'file-text',
      header: 'Garantías',
      path: ['guarantees'],
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin, UserRoles.agencyUser]),
    },
    {
      icon: 'usergroup-add',
      header: 'Grupos',
      path: ['groups'],
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin]),
    },
    {
      icon: 'barcode',
      header: 'Productos',
      path: ['products'],
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin]),
    },
    {
      icon: 'user',
      header: 'Usuarios',
      path: ['users'],
      display$: this.permissionService.hasReadPermission([UserRoles.superAdmin, UserRoles.agencyUser]),
    },
    {
      icon: 'car',
      header: 'Vehículos',
      path: ['vehicles'],
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
  mobileQuery: MediaQueryList;
  darkModeChecked = this.themeService.currentTheme === Themes.dark;
  themeOptions: NzSelectOptionInterface[] = [
    {
      label: 'Claro',
      value: Themes.default,
    },
    {
      label: 'Oscuro',
      value: Themes.dark,
    },
  ];
  private _mobileQueryListener: () => void;

  constructor(
    private store: Store<IvtState>,
    private permissionService: PermissionService,
    @Inject(IVT_UI_STATE_CONFIGURATION) private config: IvtUiStateConfiguration,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher,
    private themeService: ThemeService,
    private actions$: Actions
  ) {
    super();
    this.mobileQuery = this.media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.isCollapsed = this.mobileQuery.matches;
  }

  ngOnInit() {
    this.actions$.pipe(ofType(fromAuth.actions.loadUserFromStorage), take(1)).subscribe(({ user }) => {
      if (!user?.token) {
        this.store.dispatch(fromAuth.actions.logout());
      }
    });
  }

  toggleIsCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 500);
  }

  toggleDarkMode(): void {
    this.themeService.loadTheme(this.darkModeChecked ? Themes.dark : Themes.default);
  }

  logout(): void {
    this.store.dispatch(fromAuth.actions.logout());
  }
}
