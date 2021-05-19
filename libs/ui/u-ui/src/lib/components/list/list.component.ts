import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IvtCollectionResponseInfo, SortEvent } from '@innovatech/common/domain';
import { QueryParams } from '@ngrx/data';

import { CrudEvents } from '../../models';
import { Dates } from '../filters/date-filter/date-filter.component';

@Component({
  template: '',
  selector: 'ivt-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListComponent<T = any> implements CrudEvents<T> {
  @Input() list: T[] = [];
  @Input() loading: boolean;
  @Input() loadingExcel: boolean;
  @Input() info: IvtCollectionResponseInfo;
  @Input() queryParams: QueryParams;
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<Partial<T>>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() filterItems = new EventEmitter<unknown>();
  @Output() exportExcel = new EventEmitter<void>();

  updateSearchBarFilter(text: string): void {
    this.filterItems.emit({ text });
  }

  updateSort(sort: SortEvent): void {
    this.filterItems.emit({ sort });
  }

  updateDateFilter(dates: Dates): void {
    this.filterItems.emit({ dates });
  }
}
