import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QueryParams } from '@ngrx/data';

import { ApsCollectionService } from '../services';

@Component({
  template: '',
  selector: 'aps-collection-checkbox-filter',
})
export abstract class ApsCollectionCheckboxFilterComponent<T = unknown> implements OnInit {
  options$ = this.collectionService.options$;
  info = this.collectionService.info$;
  loading$ = this.collectionService.loading$;
  pageIndex$ = this.collectionService.pageIndex$;
  last$ = this.collectionService.last$;
  queryParams$ = this.collectionService.queryParams$;
  sortValue: any[];
  filterPropertyName: string;
  @Output() filterItems = new EventEmitter<QueryParams>();

  constructor(protected collectionService: ApsCollectionService<unknown>) {}

  ngOnInit() {
    this.collectionService.getWithQuery({ sort: this.sortValue, resetList: String(true) });
  }

  onFilterItems(ids: number[]): void {
    this.filterItems.emit({ [this.filterPropertyName]: ids.toString() });
  }

  filterOptions(queryParams: QueryParams): void {
    this.collectionService.getWithQuery({ ...queryParams, sort: this.sortValue });
  }
}
