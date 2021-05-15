import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProductCollectionService } from '@innovatech/ui/products/data-access';
import { LoadingService } from '@ivt/u-state';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { take } from 'rxjs/operators';

import { AssignProductsModalComponent } from '../../components/assign-products-modal/assign-products-modal.component';
import {
  assignGroupProducts,
  assignGroupProductsSuccess,
  clearGroupsStore,
  getGroupProducts,
} from '../../state/groups.actions';
import { getGroupsProductsState } from '../../state/groups.selectors';

@Component({
  selector: 'ivt-assign-products-modal-container',
  templateUrl: './assign-products-modal-container.component.html',
  styleUrls: ['./assign-products-modal-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AssignProductsModalContainerComponent implements OnInit, OnDestroy {
  @ViewChild(AssignProductsModalComponent, { static: true }) formComponent: AssignProductsModalComponent;
  @Input() groupId: number;
  loading$ = this.loadingService.loadingGet$;
  products$ = this.productCollectionService.entities$;
  groupProducts$ = this.store.pipe(select(getGroupsProductsState));

  constructor(
    private productCollectionService: ProductCollectionService,
    private store: Store,
    private actions$: Actions,
    private modalRef: NzModalRef,
    private messageService: NzMessageService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.productCollectionService.getWithQuery({});
    this.store.dispatch(getGroupProducts({ groupId: this.groupId }));
    this.actions$.pipe(ofType(assignGroupProductsSuccess), take(1)).subscribe(() => {
      this.messageService.success('Los productos del grupo se han actualizado con éxito');
      this.modalRef.close();
    });
  }

  submitChild(): boolean {
    this.formComponent.submit();
    return false;
  }

  submit(productIds: number[]): void {
    const payload = { groupId: this.groupId, productIds };
    this.store.dispatch(assignGroupProducts({ payload }));
  }

  ngOnDestroy() {
    this.store.dispatch(clearGroupsStore());
  }
}
