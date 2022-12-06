import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { ProductCollectionService, ProductDataService } from '@musicr/ui/products/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';

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
