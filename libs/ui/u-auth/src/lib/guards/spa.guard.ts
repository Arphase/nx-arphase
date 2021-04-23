import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@ivt/u-state';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class SpaGuard implements CanActivate {
  spaUrlTruee = this.router.parseUrl('/spa');

  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    return this.authService.isAuthenticated().pipe(
      take(1),
      map(isAuthenticated => (isAuthenticated ? this.spaUrlTruee : true))
    );
  }
}
