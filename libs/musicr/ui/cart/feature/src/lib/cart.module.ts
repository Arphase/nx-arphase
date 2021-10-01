import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartTabComponent } from './components/cart-tab/cart-tab.component';
import { CartTabContainerComponent } from './containers/cart-tab-container/cart-tab-container.component';
import { SocialEventFormContainerComponent } from './containers/social-event-form-container/social-event-form-container.component';
import { PersonalDataFormContainerComponent } from './containers/personal-data-form-container/personal-data-form-container.component';
import { ConfirmationContainerComponent } from './containers/confirmation-container/confirmation-container.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { SocialEventFormComponent } from './components/social-event-form/social-event-form.component';

@NgModule({
  imports: [
    CommonModule,
    NzDrawerModule,
    NzButtonModule,
    NzGridModule,
    NzIconModule,
    NzDividerModule,
    CartRoutingModule,
  ],
  declarations: [CartComponent, CartTabComponent, CartTabContainerComponent, SocialEventFormContainerComponent, PersonalDataFormContainerComponent, ConfirmationContainerComponent, ConfirmationComponent, PersonalDataFormComponent, SocialEventFormComponent],
  exports: [CartComponent],
})
export class CartModule {}
