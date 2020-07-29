import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';

import { AuthService } from '../services';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ payload }) =>
        this.authService.signIn(payload).pipe(
          map((user) => AuthActions.signInSuccess({ user })),
          catchError(() => of(AuthActions.signInFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService) {}
}
