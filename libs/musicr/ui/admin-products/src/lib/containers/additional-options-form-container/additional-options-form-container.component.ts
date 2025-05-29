import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { filterNil } from '@arphase/ui/utils';
import { AdditionalOption } from '@musicr/domain';
import { AdditionalOptionCollectionService } from '@musicr/ui/products/data';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';
import { AdditionalOptionsFormComponent } from '../../components/additional-options-form/additional-options-form.component';

@Component({
  selector: 'mrl-additional-options-form-container',
  templateUrl: './additional-options-form-container.component.html',
  styleUrls: ['./additional-options-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [AdditionalOptionsFormComponent, CommonModule],
})
export class AdditionalOptionsFormContainerComponent extends ApsFormContainerComponent<AdditionalOption> {
  deletedItemIndexSubject = new BehaviorSubject<number>(null);
  deletedItemIndex$ = this.deletedItemIndexSubject.asObservable();

  constructor(
    protected additionalOptionCollectionService: AdditionalOptionCollectionService,
    private modal: NzModalService,
  ) {
    super(additionalOptionCollectionService);
  }

  deleteItem(payload: { item: AdditionalOption; index: number }): void {
    const { item, index } = payload;
    const { name } = item;

    this.additionalOptionCollectionService.entityActions$
      .pipe(ofEntityOp(EntityOp.SAVE_DELETE_ONE_SUCCESS), take(1))
      .subscribe(() => this.deletedItemIndexSubject.next(index));

    this.modal
      .confirm({ nzContent: `¿Desea eliminar la opción adicional ${name}?`, nzOnOk: () => true })
      .afterClose.pipe(take(1), filterNil())
      .subscribe(() => this.additionalOptionCollectionService.delete(item, { isOptimistic: false }));
  }
}
