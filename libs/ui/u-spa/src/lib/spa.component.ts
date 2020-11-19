import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MenuItem } from '@ivt/c-data';
import { fromAuth, getAuthUserEmailState, getAuthUserNameState, PermissionService } from '@ivt/u-state';
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
  constructor(private store: Store<any>, private permissionService: PermissionService) {}

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
        {
          icon: 'folder_open',
          header: 'Productos',
          path: ['products'],
          display: hasPermission,
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
