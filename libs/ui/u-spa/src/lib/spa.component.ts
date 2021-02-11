import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject } from '@angular/core';
import { MenuItem } from '@ivt/c-data';
import {
  fromAuth,
  getAuthUserEmailState,
  getAuthUserNameState,
  IVT_UI_STATE_CONFIGURATION,
  IvtState,
  IvtUiStateConfiguration,
  PermissionService,
} from '@ivt/u-state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent {
  isCollapsed = true;
  menuItems$ = this.getMenuItems();
  name$ = this.store.pipe(select(getAuthUserNameState));
  email$ = this.store.pipe(select(getAuthUserEmailState));
  version = this.config.version;
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private store: Store<IvtState>,
    private permissionService: PermissionService,
    @Inject(IVT_UI_STATE_CONFIGURATION) private config: IvtUiStateConfiguration,
    private cdr: ChangeDetectorRef,
    private media: MediaMatcher
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  getMenuItems(): Observable<MenuItem[]> {
    return this.permissionService.hasReadPermission().pipe(
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
        // TODO: uncomment when feature is ready
        // {
        //   icon: 'folder_open',
        //   header: 'Productos',
        //   path: ['products'],
        //   display: hasPermission,
        // },
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
      ])
    );
  }

  logout(): void {
    this.store.dispatch(fromAuth.actions.logout());
  }
}
