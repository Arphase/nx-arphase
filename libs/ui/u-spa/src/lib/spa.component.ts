import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
  opened: boolean;
  menuItems$ = this.getMenuItems();
  name$ = this.store.pipe(select(getAuthUserNameState));
  email$ = this.store.pipe(select(getAuthUserEmailState));
  version = this.config.version;
  constructor(
    private store: Store<IvtState>,
    private permissionService: PermissionService,
    @Inject(IVT_UI_STATE_CONFIGURATION) private config: IvtUiStateConfiguration
  ) {}

  getMenuItems(): Observable<MenuItem[]> {
    return this.permissionService.hasReadPermission().pipe(
      map(hasPermission => [
        {
          icon: 'insert_chart_outlined',
          header: 'Dashboard',
          path: ['dashboard'],
          display: true,
        },
        {
          icon: 'description',
          header: 'Garantías',
          path: ['guarantees'],
          display: true,
        },
        {
          icon: 'groups',
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
          icon: 'face',
          header: 'Usuarios',
          path: ['users'],
          display: true,
        },
        {
          icon: 'directions_car',
          header: 'Vehículos',
          path: ['vehicles'],
          display: true,
        },
        {
          icon: 'construction',
          header: 'Revisiones',
          path: ['revisions'],
          display: true,
        },
      ])
    );
  }

  onOpenMenu(): void {
    this.opened = true;
  }

  onCloseMenu(): void {
    this.opened = false;
  }

  onToggleNavbar(): void {
    this.opened = !this.opened;
  }

  logout(): void {
    this.store.dispatch(fromAuth.actions.logout());
  }
}
