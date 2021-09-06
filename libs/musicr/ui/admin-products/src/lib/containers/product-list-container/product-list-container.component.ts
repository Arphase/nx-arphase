import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

import { ProductCollectionService } from '../../services/product-collection.service';
import { ProductDataService } from '../../services/product-data.service';

@Component({
  selector: 'mrl-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListContainerComponent extends ApsListContainerComponent<Product> {
  constructor(
    protected productCollectionService: ProductCollectionService,
    protected productDataService: ProductDataService,
    protected modal: NzModalService,
    protected messageService: NzMessageService
  ) {
    super(productCollectionService, productDataService, modal, messageService);
  }

  deleteItem(item: Product): void {
    const { name } = item;
    this.deleteConfirmMessage = `¿Desea eliminar el producto ${name}?`;
    this.deleteSuccessMessage = `El producto ${name} se ha eliminado`;
    super.deleteItem(item);
  }
}
