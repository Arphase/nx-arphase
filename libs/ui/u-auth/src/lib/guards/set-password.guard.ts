import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { IvtState } from '@ivt/u-state';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class SetPasswordGuard implements CanActivate {
  constructor(
    private store: Store<IvtState>,
    private actions$: Actions,
    private router: Router,
    private storage: Storage
  ) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    await this.storage.clear();
    return true;
  }
}
