import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import { guaranteeDateTypeOptions, UserRoles } from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';

@Component({
  selector: 'ivt-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [CurrencyPipe, { provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class DashboardComponent extends ApsListComponent<number[]> {
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
