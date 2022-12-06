import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApsFormContainerComponent } from '@arphase/ui/core';
import { Order } from '@musicr/domain';
import { NzMessageService } from 'ng-zorro-antd/message';

import { OrderCollectionService } from '../../services/order-collection.service';
import { OrderFormService } from '../../services/order-form.service';

@Component({
  selector: 'mrl-order-form-container',
  templateUrl: './order-form-container.component.html',
  styleUrls: ['./order-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [OrderFormService],
})
export class OrderFormContainerComponent extends ApsFormContainerComponent<Order> {
  form = this.orderFormService.form;
  currentCustomer$ = this.orderFormService.currentCustomer$;
  productsData$ = this.orderFormService.productsData$;
  createSuccessMessage = 'La orden se ha creado';
  updateSuccessMessage = 'La orden se ha actualizado';
  successUrl = '/spa/orders';

  constructor(
    protected orderCollectionService: OrderCollectionService,
    protected router: Router,
    protected messageService: NzMessageService,
    private orderFormService: OrderFormService
  ) {
    super(orderCollectionService, router, messageService);
  }

  emailChanges(email: string): void {
    this.orderFormService.getCustomerByEmail(email);
  }

  getProductData(productId: number): void {
    this.orderFormService.getProductData(productId);
  }
}
