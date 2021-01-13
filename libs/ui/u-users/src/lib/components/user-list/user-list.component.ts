import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Select } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns } from './user-list.constants';

@Component({
  selector: 'ivt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent extends IvtListComponent<Product> {
  @Input() groupOptions: Select[] = [];
  @Input() companyOptions: Select[] = [];
  columns = columns;
  @Output() filterCompanies = new EventEmitter<number[]>();

  updateGroupsFilters(groupIds: number[]): void {
    this.filterItems.emit({ groupIds });
    this.filterCompanies.emit(groupIds);
  }

  updateCompaniesFilters(companyIds: number[]): void {
    this.filterItems.emit({ companyIds });
  }
}
