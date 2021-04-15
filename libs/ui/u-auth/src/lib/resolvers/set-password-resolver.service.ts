import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router } from '@angular/router';
import { fromAuth, IvtState } from '@ivt/u-state';
import { Actions, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordResolverService implements Resolve<Action> {
  constructor(private store: Store<IvtState>, private actions$: Actions, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Action> {
    const passwordToken = route.paramMap.get('passwordToken');
    this.store.dispatch(fromAuth.actions.validateToken({ payload: { passwordToken } }));

    this.actions$
      .pipe(ofType(fromAuth.actions.validateTokenFailed), take(1))
      .subscribe(() => this.router.navigateByUrl('auth/expired-token'));

    return this.actions$.pipe(ofType(fromAuth.actions.validateTokenSuccess), take(1));
  }
}
