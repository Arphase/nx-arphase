import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class DeleteLocalStorageGuard implements CanActivate {
  canActivate(): boolean {
    localStorage.clear();
    return true;
  }
}
