import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IvtQueryParams } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { buildQueryParams, IvtCollectionService, IvtDataService, IvtEntityCollection } from '@ivt/u-state';
import { select } from '@ngrx/store';
import { map, take, takeUntil } from 'rxjs/operators';

import { IvtConfirmationDialogComponent, IvtSubscriberComponent } from '../../components';

@Component({
  selector: 'ivt-list-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListContainerComponent<T> extends IvtSubscriberComponent {
  list$ = this.entityCollectionService.entities$;
  loading$ = this.entityCollectionService.loading$;
  hasMore$ = this.entityCollectionService.store.pipe(
    select(this.entityCollectionService.selectors.selectCollection),
    filterNil(),
    map((collection: IvtEntityCollection<T>) => collection.hasMore)
  );
  loadingExcel$ = this.entityDataService.loadingExcel$;
  queryParams: IvtQueryParams;
  excelFileName: string;
  excelUrl: string;
  deleteConfirmMessage: string;

  constructor(
    protected entityCollectionService: IvtCollectionService<T>,
    protected entityDataService: IvtDataService<T>,
    @Optional() protected dialog?: MatDialog
  ) {
    super();
    this.entityCollectionService.store
      .pipe(select(this.entityCollectionService.selectors.selectCollection), filterNil(), takeUntil(this.destroy$))
      .subscribe((collection: IvtEntityCollection<T>) => (this.queryParams = collection.queryParams));
    this.excelUrl = `${this.entityDataService.getEntitiesUrl()}/export/excel`;
  }

  getMoreItems(): void {
    const queryParams: IvtQueryParams = {
      ...this.queryParams,
      resetList: String(false),
    };
    this.entityCollectionService.getWithQuery(queryParams);
  }

  filterItems(payload: IvtQueryParams): void {
    const queryParams: IvtQueryParams = {
      ...this.queryParams,
      ...payload,
      resetList: String(true),
    };
    this.entityCollectionService.getWithQuery(queryParams);
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
    this.dialog
      .open(IvtConfirmationDialogComponent, { data: { message: this.deleteConfirmMessage } })
      .afterClosed()
      .pipe(take(1), filterNil())
      .subscribe(() => this.entityCollectionService.delete(item));
  }
}
