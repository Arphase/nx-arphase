import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

import { IvtColumns, SortEvent } from '../table.model';

@Component({
  selector: 'ivt-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtTableHeaderComponent {
  @Input() columns: IvtColumns;
  @Output() sort = new EventEmitter<SortEvent>();
  activeFilter: string;

  updateSort(sortEvent: SortEvent): void {
    this.activeFilter = sortEvent.value;
    this.sort.emit(sortEvent);
  }
}
