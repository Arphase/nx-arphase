import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordGuard implements CanActivate {
  canActivate(): boolean {
    localStorage.clear();
    return true;
  }
}
