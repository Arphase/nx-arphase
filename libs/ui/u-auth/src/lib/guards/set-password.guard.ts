import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { fromAuth } from '@ivt/u-state';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordGuard implements CanActivate {
  constructor(private store: Store<any>, private actions$: Actions, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const passwordToken = route.paramMap.get('passwordToken');
    this.store.dispatch(fromAuth.actions.validateToken({ payload: { passwordToken } }));

    this.actions$
      .pipe(ofType(fromAuth.actions.validateTokenFailed), pipe(take(1)))
      .subscribe(() => this.router.navigateByUrl('auth/expired-token'));

    return this.actions$.pipe(ofType(fromAuth.actions.validateTokenSuccess), mapTo(true));
  }
}
