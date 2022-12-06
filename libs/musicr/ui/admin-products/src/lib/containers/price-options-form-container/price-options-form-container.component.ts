import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsFormContainerComponent, filterNil } from '@arphase/ui/core';
import { PriceOption } from '@musicr/domain';
import { PhotoCollectionService, PriceOptionCollectionService } from '@musicr/ui/products/data';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'mrl-price-options-form-container',
  templateUrl: './price-options-form-container.component.html',
  styleUrls: ['./price-options-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PriceOptionsFormContainerComponent extends ApsFormContainerComponent<PriceOption> {
  deletetedItemIndexSubject = new BehaviorSubject<number>(null);
  deletedItemIndex$ = this.deletetedItemIndexSubject.asObservable();

  constructor(
    protected priceOptionCollectionService: PriceOptionCollectionService,
    private photoCollectionService: PhotoCollectionService,
    private modal: NzModalService
  ) {
    super(priceOptionCollectionService);
  }

  removePhoto(id: number): void {
    this.photoCollectionService.delete(id);
  }

  deleteItem(payload: { item: PriceOption; index: number }): void {
    const { item, index } = payload;
    const { name } = item;

    this.priceOptionCollectionService.entityActions$
      .pipe(ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS), take(1))
      .subscribe(() => this.deletetedItemIndexSubject.next(index));

    this.modal
      .confirm({ nzContent: `¿Desea eliminar la opción de precio ${name}?`, nzOnOk: () => true })
      .afterClose.pipe(take(1), filterNil())
      .subscribe(() => this.priceOptionCollectionService.delete(item, { isOptimistic: false }));
  }
}
