import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { IvtBreakpointShow, IvtColumns, IvtColumnSizes, SortEvent } from '../table.model';

@Component({
  selector: 'ivt-table-header',
  templateUrl: './table-header.component.html',
  styleUrls: ['./table-header.component.less'],
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

  getClasses(columnSizes: IvtColumnSizes, show: IvtBreakpointShow): Record<string, boolean> {
    return {
      col: !columnSizes?.xs && !columnSizes?.sm && !columnSizes?.md && !columnSizes?.lg && !columnSizes?.xl,
      [`col-${columnSizes?.xs}`]: !!columnSizes?.xs,
      [`col-sm-${columnSizes?.sm}`]: !!columnSizes?.sm,
      [`col-md-${columnSizes?.md}`]: !!columnSizes?.md,
      [`col-lg-${columnSizes?.lg}`]: !!columnSizes?.lg,
      [`col-xl-${columnSizes?.xl}`]: !!columnSizes?.xl,
      [`d-none`]: !!show,
      [`d-xs-block`]: !!show?.xs,
      [`d-sm-block`]: !!show?.sm,
      [`d-md-block`]: !!show?.md,
      [`d-lg-block`]: !!show?.lg,
      [`d-xl-block`]: !!show?.xl,
    };
  }
}
