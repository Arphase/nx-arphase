import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApsQueryParams } from '@arphase/common';
import { ApsCollectionService } from '@arphase/ui/data';

@Component({
  template: '',
  selector: 'aps-collection-checkbox-filter',
  standalone: false,
})
export abstract class ApsCollectionCheckboxFilterComponent<T> implements OnInit {
  options$ = this.collectionService.options$;
  info = this.collectionService.info$;
  loading$ = this.collectionService.loading$;
  pageIndex$ = this.collectionService.pageIndex$;
  last$ = this.collectionService.last$;
  queryParams$ = this.collectionService.queryParams$;
  sortValue: unknown;
  filterPropertyName: string;
  @Output() filterItems = new EventEmitter<ApsQueryParams>();

  constructor(protected collectionService: ApsCollectionService<T>) {}

  ngOnInit() {
    this.collectionService.getWithQuery({ sort: this.sortValue as string[], resetList: String(true) });
  }

  onFilterItems(ids: number[]): void {
    this.filterItems.emit({ [this.filterPropertyName]: ids.toString() });
  }

  filterOptions(queryParams: ApsQueryParams): void {
    this.collectionService.getWithQuery({ ...queryParams, sort: this.sortValue as string[] });
  }
}
