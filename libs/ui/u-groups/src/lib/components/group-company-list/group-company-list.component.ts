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
import { Company} from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns, dateTypeOptions, statusOptions } from './group-company-list.constants';

@Component({
  selector: 'ivt-group-company-list',
  templateUrl: './group-company-list.component.html',
  styleUrls: ['./group-company-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCompanyListComponent extends IvtListComponent<Company> implements OnChanges {
  @Input() clearSelected: boolean;
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  statusOptions = statusOptions;
  selectedIds = new SelectionModel<number>(true, []);
  @Output() downloadPdf = new EventEmitter<number>();
  @Output() createPaymentOrder = new EventEmitter<number[]>();

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

  /*
  updateStatusFilter(status: GroupStatus): void {
    this.filterItems.emit({ status });
  }
  */
}
