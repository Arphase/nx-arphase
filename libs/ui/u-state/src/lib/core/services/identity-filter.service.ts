import { Injectable } from '@angular/core';
import { UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { select, Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

import { getAuthUserRoleState } from '../../auth/state/auth.selectors';
import { CompanyCollectionService } from '../../companies/services/company-collection.service';
import { GroupCollectionService } from '../../groups/services/group-collection.service';
import { IvtState } from '../../state/ivt.state';
import { UserCollectionService } from '../../users/services/user-collection.service';

@Injectable({
  providedIn: 'root',
})
export class IdentityFilterService {
  groupOptions$ = this.groupCollectionService.options$;
  companyOptions$ = this.companyCollectionService.options$;
  userOptions$ = this.userCollectionService.options$;

  constructor(
    private store: Store<IvtState>,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService
  ) {}

  getItems(): void {
    this.store.pipe(select(getAuthUserRoleState), filterNil(), take(1)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.groupCollectionService.getWithQuery({});
        this.companyCollectionService.getWithQuery({});
      }
      this.userCollectionService.getWithQuery({});
    });
  }
}
