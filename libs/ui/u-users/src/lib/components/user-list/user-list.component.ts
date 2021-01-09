import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Product, Select } from '@ivt/c-data';
import { IvtColumns, IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListComponent extends IvtListComponent<Product> {
  @Input() groupOptions: Select[] = [];
  @Input() companiesOptions: Select[] = [];
  @Output() filterCompanies = new EventEmitter<number[]>();
  columns: IvtColumns = [
    {
      label: 'Nombre',
      prop: 'user.firstName',
      sortable: true,
      colSizes: {
        xs: '3',
      },
    },
    {
      label: 'Correo',
      prop: 'user.email',
      sortable: true,
      colSizes: {
        xs: '3',
      },
    },
    {
      label: 'Fecha de alta',
      prop: 'user.createdAt',
      sortable: true,
      colSizes: {
        xs: '3',
      },
    },
    {
      label: 'Compañía',
      prop: 'company.businessName',
      sortable: true,
      colSizes: {
        xs: '3',
      },
    },
  ];

  updateGroupsFilters(groupIds: number[]): void {
    this.filterItems.emit({ groupIds });
    this.filterCompanies.emit(groupIds);
  }

  updateCompaniesFilters(companyIds: number[]): void {
    this.filterItems.emit({ companyIds });
  }
}
