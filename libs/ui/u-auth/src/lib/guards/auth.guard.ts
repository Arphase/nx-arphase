import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService, fromAuth } from '@ivt/u-state';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  loginUrlTree = this.router.parseUrl('/auth');

  constructor(private router: Router, private authService: AuthService, private actions$: Actions) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      take(1),
      switchMap(isAuthenticated =>
        isAuthenticated
          ? of(true)
          : this.actions$.pipe(
              ofType(fromAuth.actions.loadUserFromStorage),
              take(1),
              map(({ user }) => (user.token ? true : this.loginUrlTree))
            )
      )
    );
  }
}
