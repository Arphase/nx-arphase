import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { User, UserRoles } from '@ivt/c-data';
import {
  CompanyCollectionService,
  getAuthUserRoleState,
  GroupCollectionService,
  IvtState,
  UserCollectionService,
  UserDataService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent extends IvtListContainerComponent<User> implements OnInit {
  groupOptions$ = this.groupCollectionService.options$;
  companiesOptions$ = this.companyCollectionService.options$;

  constructor(
    protected userCollectionService: UserCollectionService,
    protected userDataService: UserDataService,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private store: Store<IvtState>
  ) {
    super(userCollectionService, userDataService);
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthUserRoleState), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.groupCollectionService.getAll();
      }
    });
  }

  filterCompanies(groupIds: number[]): void {
    this.companyCollectionService.getWithQuery({ groupIds: groupIds.toString(), resetList: String(true) });
  }
}
