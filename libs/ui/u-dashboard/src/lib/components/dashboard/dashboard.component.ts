import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { guaranteeDateTypeOptions } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe],
})
export class DashboardComponent extends IvtListComponent<number[]> {
  @Input() data: { name: string; value: string }[];
  @Input() isEmpty: boolean;
  dateTypeOptions = guaranteeDateTypeOptions;
  colors = {
    domain: ['#53C51A', '#FBAD13', '#FF4D4E', '#1A90FF'],
  };
  @Output() filterCompanies = new EventEmitter<number[]>();
  @Output() filterUsers = new EventEmitter<number[]>();

  yAxisTickFormatting(value: string): string {
    return new CurrencyPipe('en-US').transform(value, '');
  }
}
