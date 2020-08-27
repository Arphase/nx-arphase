import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  fromAuth,
  getAuthUserEmailState,
  getAuthUserNameState,
} from '@ivt/state';
import { select, Store } from '@ngrx/store';

import { menuItems } from './spa.constants';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent {
  opened: boolean;
  menuItems = menuItems;
  name$ = this.store.pipe(select(getAuthUserNameState));
  email$ = this.store.pipe(select(getAuthUserEmailState));
  constructor(private store: Store<any>) {}

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
