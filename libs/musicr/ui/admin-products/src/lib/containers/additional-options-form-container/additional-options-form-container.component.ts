import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsFormContainerComponent, filterNil } from '@arphase/ui/core';
import { AdditionalOption } from '@musicr/domain';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject, take } from 'rxjs';

import { AdditionalOptionCollectionService } from '../../services/additional-option-collection.service';

@Component({
  selector: 'mrl-additional-options-form-container',
  templateUrl: './additional-options-form-container.component.html',
  styleUrls: ['./additional-options-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalOptionsFormContainerComponent extends ApsFormContainerComponent<AdditionalOption> {
  deletetedItemIndexSubject = new BehaviorSubject<number>(null);
  deletedItemIndex$ = this.deletetedItemIndexSubject.asObservable();

  constructor(
    protected additionalOptionCollectionService: AdditionalOptionCollectionService,
    private modal: NzModalService
  ) {
    super(additionalOptionCollectionService);
  }

  deleteItem(payload: { item: AdditionalOption; index: number }): void {
    const { item, index } = payload;
    const { name } = item;

    this.additionalOptionCollectionService.entityActions$
      .pipe(ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS), take(1))
      .subscribe(() => {
        console.log(index);
        this.deletetedItemIndexSubject.next(index);
      });

    this.modal
      .confirm({ nzContent: `¿Desea eliminar la opción adicional ${name}?`, nzOnOk: () => true })
      .afterClose.pipe(take(1), filterNil())
      .subscribe(() => this.additionalOptionCollectionService.delete(item, { isOptimistic: false }));
  }
}
