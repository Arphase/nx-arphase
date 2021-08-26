import { Component, OnInit } from '@angular/core';
import { filterNil } from '@arphase/ui';
import { GuaranteeStatus } from '@innovatech/common/domain';
import { QueryParams } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { keyBy } from 'lodash';
import { map, take } from 'rxjs/operators';

import { getGuaranteeSummary } from '../../state/dashboard.actions';
import { getDashboardGuaranteeSummaryState, getDashboardQueryParamsState } from '../../state/dashboard.selectors';

@Component({
  selector: 'ivt-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.less'],
})
export class DashboardContainerComponent implements OnInit {
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
  queryParams$ = this.store.pipe(select(getDashboardQueryParamsState));

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.queryParams$.pipe(take(1)).subscribe(queryParams => this.store.dispatch(getGuaranteeSummary(queryParams)));
  }

  filterItems(payload: QueryParams): void {
    this.store.dispatch(getGuaranteeSummary({ payload }));
  }
}
