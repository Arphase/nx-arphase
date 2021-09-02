import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, ROOT_EFFECTS_INIT } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  loadUserFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ROOT_EFFECTS_INIT),
      map(() => {
        const user = {
          id: Number(localStorage.getItem('id')),
          firstName: localStorage.getItem('firstName'),
          lastName: localStorage.getItem('lastName'),
          email: localStorage.getItem('email'),
          role: localStorage.getItem('role'),
          token: localStorage.getItem('token'),
        };
        return AuthActions.loadUserFromStorage({ user });
      })
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      mergeMap(({ payload }) =>
        this.authService.signIn(payload).pipe(
          map(user => AuthActions.signInSuccess({ user })),
          catchError(() => of(AuthActions.signInFailed()))
        )
      )
    )
  );

  signInSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.signInSuccess),
        tap(({ user }) => {
          Object.keys(user).forEach(key => localStorage.setItem(key, String(user[key])));
          this.router.navigateByUrl('/spa');
        })
      ),
    { dispatch: false }
  );

  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout),
        tap(() => {
          this.router.navigateByUrl('/auth');
          localStorage.clear();
        })
      ),
    { dispatch: false }
  );

  setPassword$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.setPassword),
      mergeMap(({ payload }) =>
        this.authService.setPassword(payload).pipe(
          map(user => AuthActions.setPasswordSuccess({ payload: { email: user.email, password: payload.password } })),
          catchError(() => of(AuthActions.setPasswordFailed()))
        )
      )
    )
  );

  setPasswordSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.setPasswordSuccess),
      map(({ payload }) => AuthActions.signIn({ payload: { email: payload.email, password: payload.password } }))
    )
  );

  validateToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.validateToken),
      mergeMap(({ payload }) =>
        this.authService.validateToken(payload).pipe(
          map(() => AuthActions.validateTokenSuccess()),
          catchError(() => of(AuthActions.validateTokenFailed()))
        )
      )
    )
  );

  sendPasswordEmail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.sendPasswordEmail),
      mergeMap(({ payload }) =>
        this.authService.sendPasswordEmail(payload).pipe(
          map(() => AuthActions.sendPasswordEmailSuccess()),
          catchError(() => of(AuthActions.sendPasswordEmailFailed()))
        )
      )
    )
  );

  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}
}
