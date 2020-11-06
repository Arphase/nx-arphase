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
import { Group} from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns, dateTypeOptions, statusOptions } from './group-list.constants';

@Component({
  selector: 'ivt-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent extends IvtListComponent<Group> implements OnChanges {
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
