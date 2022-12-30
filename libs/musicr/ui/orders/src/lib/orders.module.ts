import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAddressFormModule } from '@arphase/ui/addresses';
import {
  ApsDateFilterModule,
  ApsEmptyModule,
  ApsPhoneModule,
  ApsRadioFilterModule,
  ApsSearchbarModule,
} from '@arphase/ui/core';
import { ProductSelectModule } from '@musicr/ui/products/ui';
import { EntityDataService } from '@ngrx/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskDirective } from 'ngx-mask';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderFormComponent } from './components/order-form/order-form.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailContainerComponent } from './containers/order-detail-container/order-detail-container.component';
import { OrderFormContainerComponent } from './containers/order-form-container/order-form-container.component';
import { OrderListContainerComponent } from './containers/order-list-container/order-list-container.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { AdditionalOptionsTotalPipe } from './pipes/additional-options-total.pipe';
import { OrderDataService } from './services/order-data.service';

@NgModule({
  imports: [
    ApsAddressFormModule,
    ApsDateFilterModule,
    ApsEmptyModule,
    ApsPhoneModule,
    ApsRadioFilterModule,
    ApsSearchbarModule,
    CommonModule,
    NgxMaskDirective,
    NzButtonModule,
    NzCheckboxModule,
    NzCollapseModule,
    NzDatePickerModule,
    NzDividerModule,
    NzDropDownModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzListModule,
    NzModalModule,
    NzMenuModule,
    NzPageHeaderModule,
    NzPopoverModule,
    NzSelectModule,
    NzSpaceModule,
    NzTableModule,
    NzTagModule,
    NzTimePickerModule,
    NzToolTipModule,
    OrdersRoutingModule,
    ProductSelectModule,
    ReactiveFormsModule,
  ],
  declarations: [
    OrderListComponent,
    OrderListContainerComponent,
    OrderDetailContainerComponent,
    OrderDetailComponent,
    AdditionalOptionsTotalPipe,
    OrderFormComponent,
    OrderFormContainerComponent,
  ],
})
export class OrdersModule {
  constructor(entityDataService: EntityDataService, orderDataService: OrderDataService) {
    entityDataService.registerService('Order', orderDataService);
  }
}
