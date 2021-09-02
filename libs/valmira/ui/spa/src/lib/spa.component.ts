import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MenuItem, SpaLayoutOptions } from '@arphase/ui/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { fromAuth } from '@valmira/ui/auth/data';
import { VALMIRA_CONFIGURATION, ValmiraConfiguration } from '@valmira/ui/core';
import { take } from 'rxjs';

@Component({
  selector: 'vma-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent implements OnInit {
  options: SpaLayoutOptions = {
    logoUrl: 'assets/img/logo-orange.svg',
    show: {
      darkModeToggle: false,
    },
  };
  menuItems: MenuItem[] = [
    {
      icon: 'pushpin',
      header: 'Reservaciones',
      path: ['reservations'],
    },
    {
      icon: 'home',
      header: 'Alojamientos',
      path: ['places'],
    },
    {
      icon: 'dollar',
      header: 'Promocodes',
      path: ['promocodes'],
    },
    {
      icon: 'shopping',
      header: 'Productos',
      path: ['additional-products'],
    },
  ];
  name$ = this.store.pipe(select(fromAuth.selectors.getAuthUserNameState));
  email$ = this.store.pipe(select(fromAuth.selectors.getAuthUserEmailState));
  version = this.config.version;

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject(VALMIRA_CONFIGURATION) private config: ValmiraConfiguration
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
