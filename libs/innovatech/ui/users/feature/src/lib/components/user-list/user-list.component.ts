import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, UserRoles } from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@innovatech/ui/permissions/data';
import { IvtListComponent } from '@ivt/u-ui';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

import { columns } from './user-list.constants';

@Component({
  selector: 'ivt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class UserListComponent extends IvtListComponent<Product> {
  @Input() groupOptions: NzSelectOptionInterface[] = [];
  @Input() companyOptions: NzSelectOptionInterface[] = [];
  columns = columns;
  @Output() filterCompanies = new EventEmitter<number[]>();
}