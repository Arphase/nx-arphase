import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { Subcategory } from '@musicr/domain';
import { SubcategoryCollectionService } from '@musicr/ui/subcategories/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createSubcategoryForm } from '../../components/subcategory-form/subcategory-form.component';

@Component({
  selector: 'mrl-subcategory-form-container',
  templateUrl: './subcategory-form-container.component.html',
  styleUrls: ['./subcategory-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SubcategoryFormContainerComponent extends ApsFormContainerComponent<Subcategory> {
  form = createSubcategoryForm();
  createSuccessMessage = 'La subcategoría se ha creado';
  updateSuccessMessage = 'La subcategoría se ha actualizado';
  successUrl = '/spa/subcategories';
  constructor(
    protected subcategoryCollectionService: SubcategoryCollectionService,
    protected router: Router,
    protected messageService: NzMessageService
  ) {
    super(subcategoryCollectionService, router, messageService);
  }
}
