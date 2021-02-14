import { Component, OnInit } from '@angular/core';
import { GuaranteeStatus, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  fromDashboard,
  getAuthUserRoleState,
  getDashboardGuaranteeSummaryState,
  getDashboardQueryParamsState,
  GroupCollectionService,
  IvtState,
  UserCollectionService,
} from '@ivt/u-state';
import { IvtSubscriberComponent } from '@ivt/u-ui';
import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { keyBy } from 'lodash-es';
import { map, take, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.less'],
})
export class DashboardContainerComponent extends IvtSubscriberComponent implements OnInit {
  data$ = this.store.pipe(
    select(getDashboardGuaranteeSummaryState),
    filterNil(),
    map(guaranteeSummary => {
      const formattedSummary = keyBy(guaranteeSummary, 'status');
      return [
        {
          name: `Pagada`,
          value: Number(formattedSummary[GuaranteeStatus.paid]?.amount) || 0,
        },
        {
          name: 'Pendiente',
          value: Number(formattedSummary[GuaranteeStatus.outstanding]?.amount) || 0,
        },
        {
          name: 'Cancelada',
          value: Number(formattedSummary[GuaranteeStatus.cancelled]?.amount) || 0,
        },
        {
          name: 'Caducada',
          value: Number(formattedSummary[GuaranteeStatus.expired]?.amount) || 0,
        },
      ];
    })
  );
  isEmpty$ = this.store.pipe(
    select(getDashboardGuaranteeSummaryState),
    filterNil(),
    map(summary => !summary.length || !summary.some(value => Number(value.amount)))
  );
  groupOptions$ = this.groupCollectionService.options$;
  companyOptions$ = this.companyCollectionService.options$;
  userOptions$ = this.userCollectionService.options$;
  queryParams$ = this.store.pipe(select(getDashboardQueryParamsState));

  constructor(
    private store: Store<IvtState>,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.store.pipe(select(getAuthUserRoleState), filterNil(), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.groupCollectionService.getWithQuery({});
        this.companyCollectionService.getWithQuery({});
        this.userCollectionService.getWithQuery({});
      }
    });

    this.queryParams$.pipe(take(1)).subscribe(queryParams => {
      this.store.dispatch(fromDashboard.actions.getGuaranteeSummary(queryParams));
    });
  }

  filterItems(payload: QueryParams): void {
    this.store.dispatch(fromDashboard.actions.getGuaranteeSummary({ payload }));
  }
}
