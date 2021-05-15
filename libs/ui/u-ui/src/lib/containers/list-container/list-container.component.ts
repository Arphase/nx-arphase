import { ChangeDetectionStrategy, Component, Optional } from '@angular/core';
import { IvtCollectionResponseInfo, IvtQueryParams } from '@innovatech/common/domain';
import { filterNil } from '@ivt/c-utils';
import {
  buildQueryParams,
  IdentityFilterService,
  IvtCollectionService,
  IvtDataService,
  IvtEntityCollection,
} from '@ivt/u-state';
import { EntityOp, ofEntityOp, QueryParams } from '@ngrx/data';
import { select } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { filter, map, take, takeUntil } from 'rxjs/operators';

import { IvtSubscriberComponent } from '../../components';

@Component({
  selector: 'ivt-list-container',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IvtListContainerComponent<T = any> extends IvtSubscriberComponent {
  list$: Observable<T[]>;
  loading$: Observable<boolean>;
  info$: Observable<IvtCollectionResponseInfo>;
  queryParams: IvtQueryParams;
  excelFileName: string;
  excelUrl: string;
  deleteConfirmMessage: string;
  deleteSuccessMessage: string;
  loadingExcel$: Observable<boolean>;
  loadingSubject = new BehaviorSubject<boolean>(false);
  ivtLoading$ = this.loadingSubject.asObservable();
  groupFilterInfo$ = this.identityFilterService?.groupFilterInfo$;
  companyFilterInfo$ = this.identityFilterService?.companyFilterInfo$;
  userFilterInfo$ = this.identityFilterService?.userFilterInfo$;

  constructor(
    @Optional() protected entityCollectionService?: IvtCollectionService<T>,
    @Optional() protected entityDataService?: IvtDataService<T>,
    @Optional() protected modal?: NzModalService,
    @Optional() protected messageService?: NzMessageService,
    @Optional() protected identityFilterService?: IdentityFilterService
  ) {
    super();
    if (
      this.entityCollectionService?.store &&
      this.entityCollectionService?.entityActions$ &&
      this.entityCollectionService?.entities$
    ) {
      this.entityCollectionService.store
        .pipe(select(this.entityCollectionService.selectors.selectCollection), filterNil(), takeUntil(this.destroy$))
        .subscribe((collection: IvtEntityCollection<T>) => (this.queryParams = collection.queryParams));

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

      this.list$ = this.entityCollectionService.entities$;

      this.loading$ = combineLatest([this.entityCollectionService?.loading$, this.ivtLoading$]).pipe(
        map(([loading1, loading2]) => loading1 || loading2)
      );

      this.info$ = this.entityCollectionService.store.pipe(
        select(this.entityCollectionService.selectors.selectCollection),
        filterNil(),
        map((collection: IvtEntityCollection<T>) => collection.info)
      );
    }

    if (this.entityDataService?.getEntitiesUrl && this.entityDataService?.loadingExcel$) {
      this.excelUrl = `${this.entityDataService.getEntitiesUrl()}/export/excel`;
      this.loadingExcel$ = this.entityDataService.loadingExcel$;
    }

    if (this.identityFilterService) {
      this.identityFilterService.getItems();
    }
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

  filterGroupOptions(queryParams: QueryParams): void {
    this.identityFilterService.groupFilterCollectionService.getWithQuery(queryParams);
  }

  filterCompanyOptions(queryParams: QueryParams): void {
    this.identityFilterService.companyFilterCollectionService.getWithQuery(queryParams);
  }

  filterUserOptions(queryParams: QueryParams): void {
    this.identityFilterService.userFilterCollectionService.getWithQuery(queryParams);
  }
}
