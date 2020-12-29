import { Injectable, InjectionToken } from '@angular/core';
import { UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { getAuthUserRoleState } from '../../auth';
import { IvtState } from '../../state';
import { PermissionTypes } from '../enums/permission-types.enum';

export const REQUIRED_PERMISSIONS = new InjectionToken<PermissionTypes[]>(
  'Required Permission Types which the user must have to complete an action (CRUD privileges)'
);

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  userRole$ = this.store.pipe(select(getAuthUserRoleState));

  constructor(private store: Store<IvtState>) {}

  hasReadPermission(): Observable<boolean> {
    return this.userRole$.pipe(
      filterNil(),
      map(role => role === UserRoles[UserRoles.superAdmin] || role === UserRoles[UserRoles.admin])
    );
  }

  hasUpdatePermission(): Observable<boolean> {
    return this.userRole$.pipe(
      filterNil(),
      map(role => role === UserRoles[UserRoles.superAdmin])
    );
  }
}
