import { Injectable, InjectionToken } from '@angular/core';
import { filterNil } from '@arphase/ui/core';
import { UserRoles } from '@innovatech/common/domain';
import { getAuthUserRoleState } from '@innovatech/ui/auth/data';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export const REQUIRED_ROLES = new InjectionToken<UserRoles[]>(
  'Required Roles which the user must have to complete an action (CRUD privileges)'
);

@Injectable({ providedIn: 'root' })
export class PermissionService {
  userRole$ = this.store.pipe(select(getAuthUserRoleState));

  constructor(private store: Store) {}

  hasReadPermission(roles: UserRoles[]): Observable<boolean> {
    return this.userRole$.pipe(
      filterNil(),
      map(role => roles.includes(UserRoles[role]))
    );
  }

  hasCreatePermission(roles: UserRoles[]): Observable<boolean> {
    return this.userRole$.pipe(
      filterNil(),
      map(role => roles.includes(UserRoles[role]))
    );
  }

  hasUpdatePermission(roles: UserRoles[]): Observable<boolean> {
    return this.userRole$.pipe(
      filterNil(),
      map(role => roles.includes(UserRoles[role]))
    );
  }

  hasDeletePermission(roles: UserRoles[]): Observable<boolean> {
    return this.userRole$.pipe(
      filterNil(),
      map(role => roles.includes(UserRoles[role]))
    );
  }
}
