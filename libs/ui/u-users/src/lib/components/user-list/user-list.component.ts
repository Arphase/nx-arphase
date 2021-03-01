import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Select, UserRoles } from '@ivt/c-data';
import { REQUIRED_ROLES } from '@ivt/u-state';
import { IvtListComponent } from '@ivt/u-ui';

import { columns } from './user-list.constants';

@Component({
  selector: 'ivt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class UserListComponent extends IvtListComponent<Product> {
  @Input() groupOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  columns = columns;
  @Output() filterCompanies = new EventEmitter<number[]>();
}
