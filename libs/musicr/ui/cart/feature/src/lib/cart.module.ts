import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAddressFormModule } from '@arphase/ui/addresses';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NgxMaskModule } from 'ngx-mask';

import { CartRoutingModule } from './cart-routing.module';
import { CartComponent } from './cart.component';
import { CartTabComponent } from './components/cart-tab/cart-tab.component';
import { ConfirmationComponent } from './components/confirmation/confirmation.component';
import { PersonalDataFormComponent } from './components/personal-data-form/personal-data-form.component';
import { SocialEventFormComponent } from './components/social-event-form/social-event-form.component';
import { CartTabContainerComponent } from './containers/cart-tab-container/cart-tab-container.component';
import { ConfirmationContainerComponent } from './containers/confirmation-container/confirmation-container.component';
import { PersonalDataFormContainerComponent } from './containers/personal-data-form-container/personal-data-form-container.component';
import { SocialEventFormContainerComponent } from './containers/social-event-form-container/social-event-form-container.component';

@NgModule({
  imports: [
    ApsAddressFormModule,
    ApsAutoErrorModule,
    CartRoutingModule,
    CommonModule,
    NgxMaskModule,
    NzButtonModule,
    NzCheckboxModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDrawerModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzSelectModule,
    NzTimePickerModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CartComponent,
    CartTabComponent,
    CartTabContainerComponent,
    SocialEventFormContainerComponent,
    PersonalDataFormContainerComponent,
    ConfirmationContainerComponent,
    ConfirmationComponent,
    PersonalDataFormComponent,
    SocialEventFormComponent,
  ],
  exports: [CartComponent],
})
export class CartModule {}
