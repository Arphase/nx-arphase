import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/core';
import { Category } from '@musicr/domain';
import { CategoryCollectionService } from '@musicr/ui/categories/data';
import { PhotoCollectionService } from '@musicr/ui/products/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createCategoryForm } from '../../components/category-form/category-form.component';

@Component({
  selector: 'mrl-category-form-container',
  templateUrl: './category-form-container.component.html',
  styleUrls: ['./category-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormContainerComponent extends ApsFormContainerComponent<Category> {
  form = createCategoryForm();
  createSuccessMessage = 'La categoría se ha creado';
  updateSuccessMessage = 'La categoría se ha actualizado';
  successUrl = '/spa/categories';
  constructor(
    protected categoryCollectionService: CategoryCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private photoCollectionService: PhotoCollectionService
  ) {
    super(categoryCollectionService, router, messageService);
  }

  removePhoto(id: number): void {
    this.photoCollectionService.delete(id);
  }
}
