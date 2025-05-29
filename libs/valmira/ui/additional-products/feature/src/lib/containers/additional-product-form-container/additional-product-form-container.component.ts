import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/forms';
import { AdditionalProduct } from '@valmira/domain';
import { AdditionalProductCollectionService } from '@valmira/ui/additional-products/data';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createAdditionalProductForm } from '../../components/additional-product-form/additional-product-form.component';

@Component({
  selector: 'vma-additional-product-form-container',
  templateUrl: './additional-product-form-container.component.html',
  styleUrls: ['./additional-product-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class AdditionalProductFormContainerComponent extends ApsFormContainerComponent<AdditionalProduct> {
  form = createAdditionalProductForm();
  createSuccessMessage = 'El producto adicional se ha creado';
  updateSuccessMessage = 'El producto adicional se ha actualizado';
  successUrl = '/spa/additional-products';
  constructor(
    protected additionalProductCollectionService: AdditionalProductCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
  ) {
    super(additionalProductCollectionService, router, messageService);
  }
}
