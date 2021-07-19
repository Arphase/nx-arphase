import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApsCollectionResponseInfo } from '@arphase/common';
import { QueryParams } from '@ngrx/data';

import { CrudEvents } from '../models/crud-events.model';

@Component({
  template: '',
  selector: 'ivt-list',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListComponent<T = any> implements CrudEvents<T> {
  @Input() list: T[] = [];
  @Input() loading: boolean;
  @Input() loadingExcel: boolean;
  @Input() info: ApsCollectionResponseInfo;
  @Input() queryParams: QueryParams = {
    resetList: String(true),
    pageIndex: 1 as any,
    pageSize: 1 as any,
  };
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<Partial<T>>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() filterItems = new EventEmitter<unknown>();
  @Output() exportExcel = new EventEmitter<void>();

  get total(): number {
    return this?.info?.total || 0;
  }

  get pageIndex(): number {
    return this?.info?.pageIndex || 1;
  }

  get pageStart(): number {
    return this?.info?.pageStart;
  }

  get pageEnd(): number {
    return this?.info?.pageEnd;
  }

  updateSearchBarFilter(text: string): void {
    this.filterItems.emit({ text });
  }

  updateDateFilter(dates): void {
    this.filterItems.emit({ dates });
  }
}
