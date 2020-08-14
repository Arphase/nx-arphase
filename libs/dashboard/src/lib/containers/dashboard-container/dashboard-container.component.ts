import { Component, OnInit } from '@angular/core';
import { fromDashboard } from '@ivt/state';
import { Store } from '@ngrx/store';
import { ChartOptions, ChartType } from 'chart.js';

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
  data = [100, 200, 300, 400];
  constructor(private store: Store<any>) {}

  ngOnInit(): void {
    this.store.dispatch(fromDashboard.actions.getGuaranteeSummary());
  }
}
