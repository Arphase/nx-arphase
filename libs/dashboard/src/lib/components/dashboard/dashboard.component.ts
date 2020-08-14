import { Component, Input, OnInit } from '@angular/core';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'ivt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @Input() data: number[];
  @Input() options: ChartOptions;
  @Input() labels: string[];
  @Input() colors: { backgroundColor: string[] }[];
  @Input() type: ChartType;
  @Input() legend: boolean;
  constructor() {}

  ngOnInit(): void {}
}
