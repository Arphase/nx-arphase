import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartComponent } from './cart.component';
import { CartTabComponent } from './components/cart-tab/cart-tab.component';
import { CartTabContainerComponent } from './containers/cart-tab-container/cart-tab-container.component';
import { PaymentMethodTabContainerComponent } from './containers/payment-method-tab-container/payment-method-tab-container.component';
import { PaymentMethodTabComponent } from './components/payment-method-tab/payment-method-tab.component';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@NgModule({
  imports: [CommonModule, NzDrawerModule, NzButtonModule, NzGridModule, NzIconModule, NzDividerModule],
  declarations: [
    CartComponent,
    CartTabComponent,
    CartTabContainerComponent,
    PaymentMethodTabContainerComponent,
    PaymentMethodTabComponent,
  ],
  exports: [CartComponent],
})
export class MusicrUiCartModule {}
