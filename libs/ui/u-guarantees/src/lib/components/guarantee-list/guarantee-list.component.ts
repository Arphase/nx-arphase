import { SelectionModel } from '@angular/cdk/collections';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Guarantee, GuaranteeStatus, Select } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns, dateTypeOptions, statusOptions } from './guarantee-list.constants';

@Component({
  selector: 'ivt-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListComponent extends IvtListComponent<Guarantee> implements OnChanges {
  @Input() clearSelected: boolean;
  @Input() groupOptions: Select[] = [];
  @Input() companiesOptions: Select[] = [];
  @Input() userOptions: Select[] = [];
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  statusOptions = statusOptions;
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();
  @Output() filterCompanies = new EventEmitter<number[]>();
  @Output() filterUsers = new EventEmitter<number[]>();

  constructor(public dialog: MatDialog) {
    super();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.clearSelected && this.clearSelected) {
      this.selectedIds.clear();
    }
  }

  onSelectItem(id: number): void {
    this.selectedIds.toggle(id);
  }

  updateStatusFilter(status: GuaranteeStatus): void {
    this.filterItems.emit({ status });
  }

  updateGroupsFilters(groupIds: number[]): void {
    this.filterItems.emit({ groupIds });
    this.filterCompanies.emit(groupIds);
  }

  updateCompaniesFilters(companyIds: number[]): void {
    this.filterItems.emit({ companyIds });
    this.filterUsers.emit(companyIds);
  }

  updateUsersFilters(userIds: number[]): void {
    this.filterItems.emit({ userIds });
  }
}
