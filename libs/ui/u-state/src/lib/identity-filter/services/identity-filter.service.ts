import { Injectable } from '@angular/core';
import { UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { getAuthUserRoleState } from '../../auth/state/auth.selectors';
import { IvtState } from '../../state/ivt.state';
import { CompanyFilterCollectionService } from './companies/company-filter-collection.service';
import { GroupFilterCollectionService } from './groups/group-filter-collection.service';
import { UserFilterCollectionService } from './users/user-filter-collection.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityFilterService {
  groupOptions$ = this.groupFilterCollectionService.options$;
  companyOptions$ = this.companyFilterCollectionService.options$;
  userOptions$ = this.userFilterCollectionService.options$;

  constructor(
    private store: Store<IvtState>,
    private groupFilterCollectionService: GroupFilterCollectionService,
    private companyFilterCollectionService: CompanyFilterCollectionService,
    private userFilterCollectionService: UserFilterCollectionService
  ) {}

  getItems(): void {
    this.store.pipe(select(getAuthUserRoleState), filterNil(), take(1)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.groupFilterCollectionService.getWithQuery({});
        this.companyFilterCollectionService.getWithQuery({});
      }
      this.userFilterCollectionService.getWithQuery({});
    });
  }
}
