import { ChangeDetectionStrategy, Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApsQueryParams } from '@arphase/common';
import { LoadingService } from '@arphase/ui/core';
import { fromGroups, getGroupsProductsState } from '@innovatech/ui/groups/data';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NZ_MODAL_DATA, NzModalRef } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

import { AssignProductsModalComponent } from '../../components/assign-products-modal/assign-products-modal.component';

@Component({
  selector: 'ivt-assign-products-modal-container',
  templateUrl: './assign-products-modal-container.component.html',
  styleUrls: ['./assign-products-modal-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AssignProductsModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild(AssignProductsModalComponent, { static: true }) formComponent: AssignProductsModalComponent;
  loading$ = this.loadingService.loadingGet$;
  products$ = this.productCollectionService.entities$;
  info$ = this.productCollectionService.info$;
  groupProducts$ = this.store.pipe(select(getGroupsProductsState));

  constructor(
    @Inject(NZ_MODAL_DATA) private modalData: { groupId: number },
    private productCollectionService: ProductCollectionService,
    private store: Store,
    private actions$: Actions,
    private modalRef: NzModalRef,
    private messageService: NzMessageService,
    private loadingService: LoadingService,
  ) {}

  ngOnInit(): void {
    this.productCollectionService.getWithQuery({});
    this.store.dispatch(fromGroups.actions.getGroupProducts({ groupId: this.modalData.groupId }));
    this.actions$.pipe(ofType(fromGroups.actions.assignGroupProductsSuccess), take(1)).subscribe(() => {
      this.messageService.success('Los productos del grupo se han actualizado');
      this.modalRef.close();
    });
  }

  submitChild(): boolean {
    this.formComponent.submit();
    return false;
  }

  filterItems(payload: ApsQueryParams): void {
    const queryParams: ApsQueryParams = {
      ...payload,
      resetList: String(true),
    };
    this.productCollectionService.getWithQuery(queryParams);
  }

  submit(productIds: number[]): void {
    const payload = { groupId: this.modalData.groupId, productIds };
    this.store.dispatch(fromGroups.actions.assignGroupProducts({ payload }));
  }

  ngOnDestroy() {
    this.store.dispatch(fromGroups.actions.clearGroupsStore());
  }
}
