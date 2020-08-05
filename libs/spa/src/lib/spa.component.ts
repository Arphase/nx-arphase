import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  fromAuth,
  getAuthUserEmailState,
  getAuthUserNameState,
} from '@ivt/state';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'ivt-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent {
  name$ = this.store.pipe(select(getAuthUserNameState));
  email$ = this.store.pipe(select(getAuthUserEmailState));
  constructor(private store: Store<any>) {}

  logout(): void {
    this.store.dispatch(fromAuth.actions.logout());
  }
}
