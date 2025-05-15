import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { AdditionalProduct } from '@valmira/domain';
import { AdditionalProductCollectionService, AdditionalProductDataService } from '@valmira/ui/additional-products/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
    selector: 'vma-additional-product-list-container',
    templateUrl: './additional-product-list-container.component.html',
    styleUrls: ['./additional-product-list-container.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AdditionalProductListContainerComponent extends ApsListContainerComponent<AdditionalProduct> {
  constructor(
    protected additionalProductCollectionService: AdditionalProductCollectionService,
    protected additionalProductDataService: AdditionalProductDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService
  ) {
    super(additionalProductCollectionService, additionalProductDataService, modal, messageService);
  }

  deleteItem(item: AdditionalProduct): void {
    const { name } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el producto ${name}?`;
    this.deleteSuccessMessage = `El producto ${name} se ha eliminado`;
    super.deleteItem(item);
  }
}
