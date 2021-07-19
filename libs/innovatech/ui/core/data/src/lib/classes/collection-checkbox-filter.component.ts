import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { QueryParams } from '@ngrx/data';

import { IvtCollectionService } from '../services';

@Component({
  template: '',
  selector: 'ivt-collection-checkbox-filter',
})
export abstract class CollectionCheckboxFilterComponent<T = unknown> implements OnInit {
  options$ = this.ivtCollectionService.options$;
  info = this.ivtCollectionService.info$;
  loading$ = this.ivtCollectionService.loading$;
  pageIndex$ = this.ivtCollectionService.pageIndex$;
  last$ = this.ivtCollectionService.last$;
  queryParams$ = this.ivtCollectionService.queryParams$;
  sortValue: any[];
  filterPropertyName: string;
  @Output() filterItems = new EventEmitter<QueryParams>();

  constructor(protected ivtCollectionService: IvtCollectionService<unknown>) {}

  ngOnInit() {
    this.ivtCollectionService.getWithQuery({ sort: this.sortValue, resetList: String(true) });
  }

  onFilterItems(ids: number[]): void {
    this.filterItems.emit({ [this.filterPropertyName]: ids.toString() });
  }

  filterOptions(queryParams: QueryParams): void {
    this.ivtCollectionService.getWithQuery({ ...queryParams, sort: this.sortValue });
  }
}
