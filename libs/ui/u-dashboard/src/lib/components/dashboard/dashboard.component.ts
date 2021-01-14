import { Component, EventEmitter, Input, Output } from '@angular/core';
import { guaranteeDateTypeOptions, Select } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';
import { ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'ivt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends IvtListComponent<number[]> {
  @Input() data: number[];
  @Input() options: ChartOptions;
  @Input() labels: string[];
  @Input() colors: { backgroundColor: string[] }[];
  @Input() type: ChartType;
  @Input() legend: boolean;
  @Input() isEmpty: boolean;
  @Input() groupOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  @Input() userOptions: Select[] = [];
  dateTypeOptions = guaranteeDateTypeOptions;
  @Output() filterCompanies = new EventEmitter<number[]>();
  @Output() filterUsers = new EventEmitter<number[]>();
}
