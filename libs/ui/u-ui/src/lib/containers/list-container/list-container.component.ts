import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IvtQueryParams } from '@ivt/c-data';
import { IvtEntityCollection, IvtCollectionService } from '@ivt/u-state';
import { filterNil } from '@ivt/c-utils';
import { select } from '@ngrx/store';
import { map, takeUntil } from 'rxjs/operators';

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
  queryParams: IvtQueryParams;

  constructor(
    protected entityCollectionService: IvtCollectionService<T>
  ) {
    super();
    this.entityCollectionService.store
      .pipe(
        select(this.entityCollectionService.selectors.selectCollection),
        filterNil(),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (collection: IvtEntityCollection) =>
          (this.queryParams = collection.queryParams)
      );
  }

  getMoreItems(): void {
    const queryParams: IvtQueryParams = {
      ...this.queryParams,
      resetList: false,
    };
    this.entityCollectionService.getWithQuery(queryParams as any);
  }

  filterItems<TQueryParams = any>(
    payload: IvtQueryParams & Partial<TQueryParams>
  ): void {
    const queryParams: IvtQueryParams = {
      ...this.queryParams,
      ...payload,
      resetList: true,
    };
    this.entityCollectionService.getWithQuery(queryParams as any);
  }

  deleteItem(item: T): void {
    this.entityCollectionService.delete(item);
  }
}
