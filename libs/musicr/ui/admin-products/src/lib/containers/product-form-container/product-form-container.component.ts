import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { Product } from '@musicr/domain';
import { ProductCollectionService, PhotoCollectionService } from '@musicr/ui/products/data';
import { SubcategoryFilterCollectionService } from '@musicr/ui/subcategories/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BehaviorSubject } from 'rxjs';

import { createProductForm } from '../../components/product-form/product-form.component';

@Component({
  selector: 'mrl-product-form-container',
  templateUrl: './product-form-container.component.html',
  styleUrls: ['./product-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductFormContainerComponent extends ApsFormContainerComponent<Product> {
  form = createProductForm();
  createSuccessMessage = 'El producto se ha creado';
  updateSuccessMessage = 'El producto se ha actualizado';
  successUrl = '/spa/products';

  removedAdditionalOptionSubject = new BehaviorSubject<number>(null);
  removedAdditionalOption = this.removedAdditionalOptionSubject.asObservable();

  constructor(
    protected productCollectionService: ProductCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private subcategoryFilterCollectionService: SubcategoryFilterCollectionService,
    private photoCollectionService: PhotoCollectionService
  ) {
    super(productCollectionService, router, messageService);
  }

  onCategoryChanges(categoryId: number): void {
    this.subcategoryFilterCollectionService.getWithQuery({ resetList: String(true), categoryId: String(categoryId) });
  }

  removePhoto(id: number): void {
    this.photoCollectionService.delete(id);
  }
}
