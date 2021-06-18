import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService } from '@innovatech/ui/products/data';
import { ApsFormContainerComponent } from '@innovatech/ui/core/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createProductForm } from '../../components/product-form/product-form.component';

@Component({
  selector: 'ivt-product-form-container',
  templateUrl: './product-form-container.component.html',
  styleUrls: ['./product-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormContainerComponent extends ApsFormContainerComponent<Product> {
  form = createProductForm();
  successUrl = '/spa/products';
  createSuccessMessage = 'El producto se ha creado con éxito';

  constructor(
    protected productCollectionService: ProductCollectionService,
    protected router: Router,
    protected messageService: NzMessageService
  ) {
    super(productCollectionService, router, messageService);
  }
}
