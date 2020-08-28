import { Component, OnInit } from '@angular/core';
import { GuaranteeStatus } from '@ivt/data';
import { fromDashboard, getDashboardGuaranteeSummaryState } from '@ivt/state';
import { filterNil } from '@ivt/utils';
import { select, Store } from '@ngrx/store';
import { ChartOptions, ChartType } from 'chart.js';
import { keyBy } from 'lodash';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ivt-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.scss'],
})
export class DashboardContainerComponent implements OnInit {
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
    map((guaranteeSummary) => {
      const formattedSummary = keyBy(guaranteeSummary, 'status');
      return [
        Number(formattedSummary[GuaranteeStatus.paid]?.amount || 0),
        Number(formattedSummary[GuaranteeStatus.outstanding]?.amount || 0),
        Number(formattedSummary[GuaranteeStatus.cancelled]?.amount) || 0,
        Number(formattedSummary[GuaranteeStatus.expired]?.amount) || 0,
      ];
    })
  );
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(fromDashboard.actions.getGuaranteeSummary());
  }
}
