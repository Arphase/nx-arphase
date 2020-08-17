import { Component, Input } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'ivt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  @Input() data: number[];
  @Input() options: ChartOptions;
  @Input() labels: string[];
  @Input() colors: { backgroundColor: string[] }[];
  @Input() type: ChartType;
  @Input() legend: boolean;
}
