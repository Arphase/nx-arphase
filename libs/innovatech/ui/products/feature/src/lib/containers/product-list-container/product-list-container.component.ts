import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService, ProductDataService } from '@innovatech/ui/products/data';
import { IvtListContainerComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-product-list-container',
  templateUrl: './product-list-container.component.html',
  styleUrls: ['./product-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListContainerComponent extends IvtListContainerComponent<Product> {
  constructor(
    protected productCollectionService: ProductCollectionService,
    protected productDataService: ProductDataService
  ) {
    super(productCollectionService, productDataService);
  }
}
