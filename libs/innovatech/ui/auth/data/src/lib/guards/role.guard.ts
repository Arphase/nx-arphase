import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getAuthUserRoleState } from '../state/auth.selectors';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  spaUrlTree = this.router.parseUrl('/spa');

  constructor(
    private store: Store,
    private router: Router,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(getAuthUserRoleState),
      map(userRole => ((route?.data?.roles || []).some(role => role === userRole) ? true : this.spaUrlTree)),
    );
  }
}
