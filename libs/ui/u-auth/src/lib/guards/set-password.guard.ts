import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, UrlTree } from '@angular/router';
import { fromAuth, IvtState } from '@ivt/u-state';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { Observable, pipe } from 'rxjs';
import { mapTo, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordGuard implements CanActivate {
  constructor(private store: Store<IvtState>, private actions$: Actions, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    localStorage.clear();
    const passwordToken = route.paramMap.get('passwordToken');
    this.store.dispatch(fromAuth.actions.validateToken({ payload: { passwordToken } }));

    this.actions$
      .pipe(ofType(fromAuth.actions.validateTokenFailed), pipe(take(1)))
      .subscribe(() => this.router.navigateByUrl('auth/expired-token'));

    return this.actions$.pipe(ofType(fromAuth.actions.validateTokenSuccess), mapTo(true));
  }
}
