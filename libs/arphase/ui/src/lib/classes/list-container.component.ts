import { Component, Optional } from '@angular/core';
import { ApsCollectionResponseInfo } from '@arphase/common';
import { ApsCollectionService, ApsEntityCollection, buildQueryParams } from '@arphase/ui';
import { filterNil } from '@innovatech/common/utils';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { EntityOp, ofEntityOp, QueryParams } from '@ngrx/data';
import { select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, take } from 'rxjs/operators';

import { ApsDataService } from '../services/data.service';

@UntilDestroy()
@Component({
  selector: 'aps-list-container',
  template: '',
})
export class ApsListContainerComponent<T = any> {
  list$: Observable<T[]>;
  loading$: Observable<boolean>;
  info$: Observable<ApsCollectionResponseInfo>;
  queryParams: QueryParams;
  excelFileName: string;
  excelUrl: string;
  deleteConfirmMessage: string;
  deleteSuccessMessage: string;
  loadingExcel$: Observable<boolean>;
  loadingSubject = new BehaviorSubject<boolean>(false);
  ivtLoading$ = this.loadingSubject.asObservable();

  constructor(
    @Optional() protected entityCollectionService?: ApsCollectionService<T>,
    @Optional() protected entityDataService?: ApsDataService<T>,
    @Optional() protected modal?: NzModalService,
    @Optional() protected messageService?: NzMessageService
  ) {
    if (
      this.entityCollectionService?.store &&
      this.entityCollectionService?.entityActions$ &&
      this.entityCollectionService?.entities$
    ) {
      this.entityCollectionService.store
        .pipe(select(this.entityCollectionService.selectors.selectCollection), filterNil(), untilDestroyed(this))
        .subscribe((collection: ApsEntityCollection<T>) => (this.queryParams = collection.queryParams));
      this.entityCollectionService.entityActions$
        .pipe(
          ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS),
          filter(() => !!this.deleteSuccessMessage && !!this.messageService),
          untilDestroyed(this)
        )
        .subscribe(() => this.messageService.success(this.deleteSuccessMessage));
      this.list$ = this.entityCollectionService.entities$;
      this.loading$ = combineLatest([this.entityCollectionService?.loading$, this.ivtLoading$]).pipe(
        map(([loading1, loading2]) => loading1 || loading2)
      );
      this.info$ = this.entityCollectionService.store.pipe(
        select(this.entityCollectionService.selectors.selectCollection),
        filterNil(),
        map((collection: ApsEntityCollection<T>) => collection.info)
      );
    }

    if (this.entityDataService?.getEntitiesUrl && this.entityDataService?.loadingExcel$) {
      this.excelUrl = `${this.entityDataService.getEntitiesUrl()}/export/excel`;
      this.loadingExcel$ = this.entityDataService.loadingExcel$;
    }
  }

  filterItems(payload?: QueryParams): void {
    const queryParams: QueryParams = {
      ...this.queryParams,
      ...payload,
      resetList: String(true),
    };
    this.entityCollectionService.getWithQuery(queryParams);
  }

  exportExcel(queryParams?: QueryParams): void {
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
