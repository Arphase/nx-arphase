import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MenuItem, SpaLayoutOptions } from '@arphase/ui/core';
import { fromAuth } from '@musicr/ui/auth/data';
import { MUSIC_REVOLUTION_CONFIGURATION, MusicRevolutionConfiguration } from '@musicr/ui/core';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mrl-spa',
  templateUrl: './spa.component.html',
  styleUrls: ['./spa.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpaComponent implements OnInit {
  options: SpaLayoutOptions = {
    logoUrl: 'assets/img/logo-white.svg',
    show: {
      darkModeToggle: false,
    },
  };
  menuItems: MenuItem[] = [
    {
      icon: 'carry-out',
      header: 'Órdenes',
      path: ['orders'],
    },
    {
      icon: 'barcode',
      header: 'Productos',
      path: ['products'],
    },
    {
      icon: 'pushpin',
      header: 'Categorías',
      path: ['categories'],
    },
    {
      icon: 'partition',
      header: 'Subcategorías',
      path: ['subcategories'],
    },
  ];
  name$ = this.store.pipe(select(fromAuth.selectors.getAuthUserNameState));
  email$ = this.store.pipe(select(fromAuth.selectors.getAuthUserEmailState));
  version = this.config.version;

  constructor(
    private store: Store,
    private actions$: Actions,
    @Inject(MUSIC_REVOLUTION_CONFIGURATION) private config: MusicRevolutionConfiguration
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
