import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IvtQueryParams } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { buildQueryParams, IvtCollectionService, IvtDataService, IvtEntityCollection } from '@ivt/u-state';
import { select } from '@ngrx/store';
import { map, take, takeUntil } from 'rxjs/operators';

import { IvtSubscriberComponent } from '../../components';

@Component({
  selector: 'ivt-list-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListContainerComponent<T = any> extends IvtSubscriberComponent {
  list$ = this.entityCollectionService.entities$;
  loading$ = this.entityCollectionService.loading$;
  hasMore$ = this.entityCollectionService.store.pipe(
    select(this.entityCollectionService.selectors.selectCollection),
    filterNil(),
    map((collection: IvtEntityCollection) => collection.hasMore)
  );
  loadingExcel$ = this.entityDataService.loadingExcel$;
  queryParams: IvtQueryParams;
  excelFileName: string;
  excelUrl: string;

  constructor(protected entityCollectionService: IvtCollectionService<T>, protected entityDataService: IvtDataService) {
    super();
    this.entityCollectionService.store
      .pipe(select(this.entityCollectionService.selectors.selectCollection), filterNil(), takeUntil(this.destroy$))
      .subscribe((collection: IvtEntityCollection) => (this.queryParams = collection.queryParams));
    this.excelUrl = `${this.entityDataService.getEntitiesUrl()}/export/excel`;
  }

  getMoreItems(): void {
    const queryParams: IvtQueryParams = {
      ...this.queryParams,
      resetList: false,
    };
    this.entityCollectionService.getWithQuery(queryParams as any);
  }

  filterItems<TQueryParams = any>(payload: IvtQueryParams & Partial<TQueryParams>): void {
    const queryParams: IvtQueryParams = {
      ...this.queryParams,
      ...payload,
      resetList: true,
    };
    this.entityCollectionService.getWithQuery(queryParams as any);
  }

  exportExcel(queryParams?: IvtQueryParams): void {
    const payload = {
      params: buildQueryParams({ ...queryParams, ...this.queryParams }),
      url: this.excelUrl,
      fileName: this.excelFileName,
    };

    this.entityDataService.exportExcel(payload).pipe(take(1)).subscribe();
  }

  deleteItem(item: T): void {
    this.entityCollectionService.delete(item);
  }
}
