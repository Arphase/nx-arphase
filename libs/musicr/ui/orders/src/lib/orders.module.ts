import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsDateFilterModule, ApsEmptyModule, ApsPhoneModule, ApsSearchbarModule } from '@arphase/ui/core';
import { EntityDataService } from '@ngrx/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { OrderDetailComponent } from './components/order-detail/order-detail.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderDetailContainerComponent } from './containers/order-detail-container/order-detail-container.component';
import { OrderListContainerComponent } from './containers/order-list-container/order-list-container.component';
import { OrdersRoutingModule } from './orders-routing.module';
import { AdditionalOptionsTotalPipe } from './pipes/additional-options-total.pipe';
import { OrderDataService } from './services/order-data.service';

@NgModule({
  imports: [
    ApsDateFilterModule,
    ApsEmptyModule,
    ApsPhoneModule,
    ApsSearchbarModule,
    CommonModule,
    NzButtonModule,
    NzCollapseModule,
    NzDividerModule,
    NzGridModule,
    NzIconModule,
    NzModalModule,
    NzPopoverModule,
    NzSpaceModule,
    NzTableModule,
    NzToolTipModule,
    OrdersRoutingModule,
  ],
  declarations: [
    OrderListComponent,
    OrderListContainerComponent,
    OrderDetailContainerComponent,
    OrderDetailComponent,
    AdditionalOptionsTotalPipe,
  ],
})
export class OrdersModule {
  constructor(entityDataService: EntityDataService, orderDataService: OrderDataService) {
    entityDataService.registerService('Order', orderDataService);
  }
}
