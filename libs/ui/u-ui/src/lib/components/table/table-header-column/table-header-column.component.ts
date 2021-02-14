import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IvtColumn, SortEvent, SortOrder } from '../table.model';

@Component({
  selector: 'ivt-table-header-column',
  templateUrl: './table-header-column.component.html',
  styleUrls: ['./table-header-column.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtTableHeaderColumnComponent {
  @Input() column: IvtColumn;

  @Input()
  set activeFilter(value: string) {
    this._activeFilter = value;

    const isActive = this._activeFilter === this.column.prop;

    if (!isActive) {
      this.clearSort();
    }
  }
  get activeFilter() {
    return this._activeFilter;
  }
  _activeFilter: string;

  @Output() sortEmitter = new EventEmitter<SortEvent>();

  status: SortOrder;

  toggleSort(): void {
    this.status = this.status === 'asc' ? 'desc' : 'asc';
    this.sortEmitter.emit({ order: this.status, value: this.column.prop });
  }

  clearSort(): void {
    this.status = null;
  }
}
