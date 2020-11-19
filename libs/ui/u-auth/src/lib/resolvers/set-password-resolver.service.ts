import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordResolverService implements Resolve<boolean> {
  resolve(): boolean {
    localStorage.clear();
    return true;
  }
}
