import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  loginUrlTree = this.router.parseUrl('/auth');

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuthenticated => (isAuthenticated ? true : this.loginUrlTree))
    );
  }
}
