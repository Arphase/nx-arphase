import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { MenuItem, UserRoles } from '@ivt/c-data';
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
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent extends IvtSubscriberComponent implements OnInit {
  isCollapsed: boolean;
  menuItems$ = this.getMenuItems();
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

  getMenuItems(): Observable<MenuItem[]> {
    return this.permissionService.hasReadPermission([UserRoles.superAdmin]).pipe(
      map(hasPermission => [
        {
          icon: 'pie-chart',
          header: 'Dashboard',
          path: ['dashboard'],
          display: true,
        },
        {
          icon: 'file-text',
          header: 'Garantías',
          path: ['guarantees'],
          display: true,
        },
        {
          icon: 'usergroup-add',
          header: 'Grupos',
          path: ['groups'],
          display: hasPermission,
        },
        {
          icon: 'barcode',
          header: 'Productos',
          path: ['products'],
          display: hasPermission,
        },
        {
          icon: 'user',
          header: 'Usuarios',
          path: ['users'],
          display: true,
        },
        {
          icon: 'car',
          header: 'Vehículos',
          path: ['vehicles'],
          display: true,
        },
        {
          icon: 'tool',
          header: 'Revisiones',
          path: ['revisions'],
          display: true,
        },
        {
          icon: 'container',
          header: 'Solicitudes',
          path: ['revision-requests'],
          display: true,
        },
      ])
    );
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
