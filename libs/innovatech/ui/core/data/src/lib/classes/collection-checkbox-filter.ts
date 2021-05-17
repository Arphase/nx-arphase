import { EventEmitter, Injectable, Output } from '@angular/core';
import { QueryParams } from '@ngrx/data';
import { take } from 'rxjs/operators';

import { IvtCollectionService } from '../services';

@Injectable()
export abstract class CollectionCheckboxFilter<T = any> {
  options$ = this.companyFilterCollectionService.options$;
  info = this.companyFilterCollectionService.info$;
  loading$ = this.companyFilterCollectionService.loading$;
  pageIndex$ = this.companyFilterCollectionService.pageIndex$;
  last$ = this.companyFilterCollectionService.last$;
  queryParams$ = this.companyFilterCollectionService.queryParams$;
  sortValue;
  filterPropertyName: string;
  @Output() filterItems = new EventEmitter<QueryParams>();

  constructor(protected companyFilterCollectionService: IvtCollectionService<any>) {
    this.companyFilterCollectionService.getWithQuery({
      sort: this.sortValue,
      resetList: String(true),
    });
  }

  onFilterItems(ids: number[]): void {
    this.filterItems.emit({ [this.filterPropertyName]: ids.toString() });
  }

  filterOptions(queryParams: QueryParams): void {
    this.pageIndex$.pipe(take(1)).subscribe(pageIndex =>
      this.companyFilterCollectionService.getWithQuery({
        ...queryParams,
        sort: this.sortValue,
        pageIndex: String(Number(pageIndex) + 1),
      })
    );
  }
}
