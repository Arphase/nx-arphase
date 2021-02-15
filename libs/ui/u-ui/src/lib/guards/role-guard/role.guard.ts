import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { getAuthUserRoleState, IvtState } from '@ivt/u-state';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RoleGuard implements CanActivate {
  spaUrlTree = this.router.parseUrl('/spa');

  constructor(private store: Store<IvtState>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean | UrlTree> {
    return this.store.pipe(
      select(getAuthUserRoleState),
      map(userRole => ((route?.data?.roles || []).some(role => role === userRole) ? true : this.spaUrlTree))
    );
  }
}
