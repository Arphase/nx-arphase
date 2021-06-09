import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { IvtCollectionResponseInfo } from '@innovatech/common/domain';
import { QueryParams } from '@ngrx/data';
import { isEqual } from 'lodash-es';

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
  @Input() info: IvtCollectionResponseInfo;
  @Input() queryParams: QueryParams;
  @Output() create = new EventEmitter<void>();
  @Output() showDetail = new EventEmitter<T>();
  @Output() edit = new EventEmitter<Partial<T>>();
  @Output() delete = new EventEmitter<T>();
  @Output() toggle = new EventEmitter<T>();
  @Output() filterItems = new EventEmitter<unknown>();
  @Output() exportExcel = new EventEmitter<void>();

  ngOnChanges(changes: SimpleChanges) {
    if (changes.queryParams) {
      console.log(this.queryParams);
    }
  }

  onQueryParamsChanged(queryParams: QueryParams) {
    if (this.queryChanged(queryParams)) {
      this.filterItems.emit(queryParams);
    }
  }

  queryChanged(queryParams: QueryParams): boolean {
    return (
      !isEqual({ ...this.queryParams, ...queryParams, sort: {} }, { ...this.queryParams, sort: {} }) ||
      this.sortingChanged(queryParams)
    );
  }

  sortingChanged(queryParams: QueryParams): boolean {
    const currentSorting = ((this.queryParams.sort as any[]) ?? [])
      .filter(field => field.value)
      .reduce((acc, current) => ({ ...acc, [current.key]: current.value }), {});
    const newSorting = ((queryParams.sort as any[]) ?? [])
      .filter(field => field.value)
      .reduce((acc, current) => ({ ...acc, [current.key]: current.value }), {});

    for (let key in currentSorting) {
      if (currentSorting[key] !== newSorting[key]) {
        return true;
      }
      delete newSorting[key];
    }
    return !!Object.keys(newSorting).length;
  }

  updateSearchBarFilter(text: string): void {
    this.filterItems.emit({ text });
  }

  updateDateFilter(dates): void {
    this.filterItems.emit({ dates });
  }
}
