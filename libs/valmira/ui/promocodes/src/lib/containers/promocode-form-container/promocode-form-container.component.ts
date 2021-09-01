import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui';
import { Promocode } from '@valmira/domain';
import { NzMessageService } from 'ng-zorro-antd/message';

import { createPromocodeForm } from '../../components/promocode-form/promocode-form.component';
import { PromocodeCollectionService } from '../../services/promocode-collection.service';

@Component({
  selector: 'vma-promocode-form-container',
  templateUrl: './promocode-form-container.component.html',
  styleUrls: ['./promocode-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocodeFormContainerComponent extends ApsFormContainerComponent<Promocode> {
  form = createPromocodeForm();
  createSuccessMessage = 'El código de descuento se ha creado';
  successUrl = '/spa/promocodes';
  constructor(
    protected promocodeCollectionService: PromocodeCollectionService,
    protected router: Router,
    protected messageService: NzMessageService
  ) {
    super(promocodeCollectionService, router, messageService);
  }
}
