import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApsCollectionResponseInfo, ApsQueryParams } from '@arphase/common';

import { CrudEvents } from '../models/crud-events.model';

@Component({
  template: '',
  selector: 'aps-list',
  standalone: false,
})
export class ApsListComponent<T> implements CrudEvents<T> {
  @Input() list: T[] = [];
  @Input() loading: boolean;
  @Input() loadingExcel: boolean;
  @Input() info: ApsCollectionResponseInfo;
  @Input() queryParams: ApsQueryParams = {
    resetList: String(true),
    pageIndex: String(1),
    pageSize: String(1),
  };
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<Partial<T>>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() filterItems = new EventEmitter<unknown>();
  @Output() exportExcel = new EventEmitter<void>();

  get total(): number {
    return this.info?.total || 0;
  }

  get pageIndex(): number {
    return this.info?.pageIndex || 1;
  }

  get pageStart(): number {
    return this.info?.pageStart;
  }

  get pageEnd(): number {
    return this.info?.pageEnd;
  }

  updateSearchBarFilter(text: string): void {
    this.filterItems.emit({ text });
  }

  updateDateFilter(dates): void {
    this.filterItems.emit({ dates });
  }

  onToggleStatusChange(item: T, active: boolean): void {
    this.edit.emit({ ...item, active });
  }
}
