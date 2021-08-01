import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui';
import { Promocode } from '@valmira/domain';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { PromocodeCollectionService } from '../../services/promocode-collection.service';
import { PromocodeDataService } from '../../services/promocode-data.service';

@Component({
  selector: 'vma-promocode-list-container',
  templateUrl: './promocode-list-container.component.html',
  styleUrls: ['./promocode-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocodeListContainerComponent extends ApsListContainerComponent<Promocode> {
  constructor(
    protected promocodeCollectionService: PromocodeCollectionService,
    protected promocodeDataService: PromocodeDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService
  ) {
    super(promocodeCollectionService, promocodeDataService, modal, messageService);
  }

  deleteItem(item: Promocode): void {
    const { name } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el promocode ${name}?`;
    this.deleteSuccessMessage = `El promocode ${name} se ha eliminado`;
    super.deleteItem(item);
  }
}
