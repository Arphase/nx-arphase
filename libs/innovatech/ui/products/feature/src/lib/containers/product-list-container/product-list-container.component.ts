import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService, ProductDataService } from '@innovatech/ui/products/data';

@Component({
    selector: 'ivt-product-list-container',
    templateUrl: './product-list-container.component.html',
    styleUrls: ['./product-list-container.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class ProductListContainerComponent extends ApsListContainerComponent<Product> {
  constructor(
    protected productCollectionService: ProductCollectionService,
    protected productDataService: ProductDataService
  ) {
    super(productCollectionService, productDataService);
  }
}
