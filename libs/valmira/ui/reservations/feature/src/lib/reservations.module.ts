import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  ApsDateFilterModule,
  ApsEmptyModule,
  ApsFeatureLayoutModule,
  ApsPhoneModule,
  ApsSearchbarModule,
} from '@arphase/ui/core';
import { ReservationsDataModule } from '@valmira/ui/reservations/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ReservationDetailComponent } from './components/reservation-detail/reservation-detail.component';
import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationDetailContainerComponent } from './containers/reservation-detail-container/reservation-detail-container.component';
import { ReservationListContainerComponent } from './containers/reservation-list-container/reservation-list-container.component';
import { ReservationsRoutingModule } from './reservations-routing.module';

@NgModule({
  imports: [
    ApsDateFilterModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsPhoneModule,
    ApsSearchbarModule,
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzCollapseModule,
    NzDividerModule,
    NzDropDownModule,
    NzGridModule,
    NzIconModule,
    NzMessageModule,
    NzModalModule,
    NzSpaceModule,
    NzTableModule,
    NzTagModule,
    NzToolTipModule,
    ReservationsDataModule,
    ReservationsRoutingModule,
  ],
  declarations: [
    ReservationListComponent,
    ReservationListContainerComponent,
    ReservationDetailContainerComponent,
    ReservationDetailComponent,
  ],
})
export class ReservationsModule {}
