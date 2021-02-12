import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { IvtQueryParams } from '@ivt/c-data';
import { filterNil } from '@ivt/c-utils';
import { buildQueryParams, IvtCollectionService, IvtDataService, IvtEntityCollection } from '@ivt/u-state';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

import { IvtSubscriberComponent } from '../../components';

@Component({
  selector: 'ivt-list-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListContainerComponent<T> extends IvtSubscriberComponent {
  loadingSubject = new BehaviorSubject<boolean>(false);
  ivtLoading$ = this.loadingSubject.asObservable();
  list$ = this.entityCollectionService.entities$;
  loading$ = combineLatest([this.entityCollectionService.loading$, this.ivtLoading$]).pipe(
    map(([loading1, loading2]) => loading1 || loading2)
  );
  hasMore$ = this.entityCollectionService.store.pipe(
    select(this.entityCollectionService.selectors.selectCollection),
    filterNil(),
    map((collection: IvtEntityCollection<T>) => collection.hasMore)
  );
  info$ = this.entityCollectionService.store.pipe(
    select(this.entityCollectionService.selectors.selectCollection),
    filterNil(),
    map((collection: IvtEntityCollection<T>) => collection.info)
  );
  loadingExcel$ = this.entityDataService.loadingExcel$;
  queryParams: IvtQueryParams;
  excelFileName: string;
  excelUrl: string;
  deleteConfirmMessage: string;
  deleteSuccessMessage: string;

  constructor(
    protected entityCollectionService: IvtCollectionService<T>,
    protected entityDataService: IvtDataService<T>,
    @Optional() protected modal?: NzModalService,
    @Optional() protected messageService?: NzMessageService
  ) {
    super();
    this.entityCollectionService.store
      .pipe(select(this.entityCollectionService.selectors.selectCollection), filterNil(), takeUntil(this.destroy$))
      .subscribe((collection: IvtEntityCollection<T>) => (this.queryParams = collection.queryParams));
    this.excelUrl = `${this.entityDataService.getEntitiesUrl()}/export/excel`;

    this.entityCollectionService.entityActions$
      .pipe(
        ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS),
        filter(() => !!this.deleteSuccessMessage && !!this.messageService),
        takeUntil(this.destroy$)
      )
      .subscribe(() => this.messageService.success(this.deleteSuccessMessage));

    this.entityCollectionService.entities$
      .pipe(
        take(1),
        filter(entities => !entities.length)
      )
      .subscribe(() => this.entityCollectionService.getWithQuery({}));
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
    this.modal
      .confirm({ nzContent: this.deleteConfirmMessage, nzOnOk: () => true })
      .afterClose.pipe(take(1), filterNil())
      .subscribe(() => this.entityCollectionService.delete(item, { isOptimistic: false }));
  }
}
