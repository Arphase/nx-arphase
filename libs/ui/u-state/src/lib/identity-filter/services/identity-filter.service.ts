import { Injectable } from '@angular/core';
import { Select, User, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { getAuthUserRoleState } from '../../auth/state/auth.selectors';
import { IvtEntityCollection } from '../../entities/entity-collection-reducer-methods';
import { IvtState } from '../../state/ivt.state';
import { CompanyFilterCollectionService } from './companies/company-filter-collection.service';
import { GroupFilterCollectionService } from './groups/group-filter-collection.service';
import { UserFilterCollectionService } from './users/user-filter-collection.service';

export interface FilterInfo {
  loading: boolean;
  options: Select[];
  last: boolean;
  pageIndex: number;
}

@Injectable({
  providedIn: 'root',
})
export class IdentityFilterService {
  groupOptions$ = this.groupFilterCollectionService.options$;
  companyOptions$ = this.companyFilterCollectionService.options$;

  private userLoading$ = this.userFilterCollectionService.loading$;
  userOptions$ = this.userFilterCollectionService.options$;
  private userInfo$ = this.userFilterCollectionService.store.pipe(
    select(this.userFilterCollectionService.selectors.selectCollection),
    map((collection: IvtEntityCollection<User>) => collection.info)
  );
  private userLast$ = this.userInfo$.pipe(map(info => info?.last));
  private userPageIndex$ = this.userInfo$.pipe(map(info => info?.pageIndex));
  userFilterInfo$: Observable<FilterInfo> = combineLatest([
    this.userLoading$,
    this.userOptions$,
    this.userLast$,
    this.userPageIndex$,
  ]).pipe(map(([loading, options, last, pageIndex]) => ({ loading, options, last, pageIndex })));

  constructor(
    private store: Store<IvtState>,
    public groupFilterCollectionService: GroupFilterCollectionService,
    public companyFilterCollectionService: CompanyFilterCollectionService,
    public userFilterCollectionService: UserFilterCollectionService
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
