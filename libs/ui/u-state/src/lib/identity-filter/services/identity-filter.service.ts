import { Injectable } from '@angular/core';
import { Company, Group, Select, User, UserRoles } from '@ivt/c-data';
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
  private groupLoading$ = this.groupFilterCollectionService.loading$;
  private groupOptions$ = this.groupFilterCollectionService.options$;
  private groupInfo$ = this.groupFilterCollectionService.store.pipe(
    select(this.groupFilterCollectionService.selectors.selectCollection),
    map((collection: IvtEntityCollection<Group>) => collection.info)
  );
  private groupLast$ = this.groupInfo$.pipe(map(info => info?.last));
  private groupPageIndex$ = this.groupInfo$.pipe(map(info => info?.pageIndex));
  groupFilterInfo$: Observable<FilterInfo> = combineLatest([
    this.groupLoading$,
    this.groupOptions$,
    this.groupLast$,
    this.groupPageIndex$,
  ]).pipe(map(([loading, options, last, pageIndex]) => ({ loading, options, last, pageIndex })));

  private companyLoading$ = this.companyFilterCollectionService.loading$;
  private companyOptions$ = this.companyFilterCollectionService.options$;
  private companyInfo$ = this.companyFilterCollectionService.store.pipe(
    select(this.companyFilterCollectionService.selectors.selectCollection),
    map((collection: IvtEntityCollection<Company>) => collection.info)
  );
  private companyLast$ = this.companyInfo$.pipe(map(info => info?.last));
  private companyPageIndex$ = this.companyInfo$.pipe(map(info => info?.pageIndex));
  companyFilterInfo$: Observable<FilterInfo> = combineLatest([
    this.companyLoading$,
    this.companyOptions$,
    this.companyLast$,
    this.companyPageIndex$,
  ]).pipe(map(([loading, options, last, pageIndex]) => ({ loading, options, last, pageIndex })));

  private userLoading$ = this.userFilterCollectionService.loading$;
  private userOptions$ = this.userFilterCollectionService.options$;
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
