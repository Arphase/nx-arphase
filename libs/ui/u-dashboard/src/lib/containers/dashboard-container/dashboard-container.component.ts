import { Component, OnDestroy, OnInit } from '@angular/core';
import { GuaranteeStatus, UserRoles } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import {
  CompanyCollectionService,
  fromDashboard,
  getAuthUserRoleState,
  getDashboardGuaranteeSummaryState,
  GroupCollectionService,
  IvtState,
  UserCollectionService,
} from '@ivt/u-state';
import { IvtSubscriberComponent } from '@ivt/u-ui';
import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType } from 'chart.js';
import { keyBy } from 'lodash';
import { map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ivt-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent extends IvtSubscriberComponent implements OnInit, OnDestroy {
  options: ChartOptions = {
    responsive: true,
  };
  labels = ['Pagada', 'Pendiente', 'Cancelada', 'Caducada'];
  colors = [
    {
      backgroundColor: ['#28a745', '#ffc107', '#e63917', '#17a2b8'],
    },
  ];
  type: ChartType = 'pie';
  legend = false;
  data$ = this.store.pipe(
    select(getDashboardGuaranteeSummaryState),
    filterNil(),
    map(guaranteeSummary => {
      const formattedSummary = keyBy(guaranteeSummary, 'status');
      return [
        Number(formattedSummary[GuaranteeStatus.paid]?.amount) || 0,
        Number(formattedSummary[GuaranteeStatus.outstanding]?.amount) || 0,
        Number(formattedSummary[GuaranteeStatus.cancelled]?.amount) || 0,
        Number(formattedSummary[GuaranteeStatus.expired]?.amount) || 0,
      ];
    })
  );
  isEmpty$ = this.store.pipe(
    select(getDashboardGuaranteeSummaryState),
    filterNil(),
    map(summary => !summary.length || !summary.some(value => value.amount))
  );
  groupOptions$ = this.groupCollectionService.options$;
  companyOptions$ = this.companyCollectionService.options$;
  userOptions$ = this.userCollectionService.options$;

  constructor(
    private store: Store<IvtState>,
    private groupCollectionService: GroupCollectionService,
    private companyCollectionService: CompanyCollectionService,
    private userCollectionService: UserCollectionService
  ) {
    super();
  }

  ngOnInit(): void {
    this.groupCollectionService.clearCache();
    this.companyCollectionService.clearCache();
    this.userCollectionService.clearCache();
    this.store.dispatch(fromDashboard.actions.getGuaranteeSummary({}));
    this.store.pipe(select(getAuthUserRoleState), filterNil(), takeUntil(this.destroy$)).subscribe(role => {
      if (role === UserRoles[UserRoles.superAdmin]) {
        this.groupCollectionService.getAll();
        this.companyCollectionService.getAll();
        this.userCollectionService.getAll();
      }
    });
  }

  filterItems(payload: QueryParams): void {
    this.store.dispatch(fromDashboard.actions.getGuaranteeSummary({ payload }));
  }

  ngOnDestroy() {
    super.ngOnDestroy();
    this.store.dispatch(fromDashboard.actions.clearDashboardState());
  }
}
