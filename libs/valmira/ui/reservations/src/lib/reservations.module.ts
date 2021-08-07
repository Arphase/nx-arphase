import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ApsDateFilterModule, ApsEmptyModule, ApsSearchbarModule } from '@arphase/ui';
import { EntityDataService } from '@ngrx/data';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';

import { ReservationListComponent } from './components/reservation-list/reservation-list.component';
import { ReservationListContainerComponent } from './containers/reservation-list-container/reservation-list-container.component';
import { ReservationsRoutingModule } from './reservations-routing.module';
import { ReservationsComponent } from './reservations.component';
import { ReservationDataService } from './services/reservation-data.service';

@NgModule({
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzDividerModule,
    NzTableModule,
    NzModalModule,
    NzMessageModule,
    NzDropDownModule,
    NzTagModule,
    NzToolTipModule,
    ApsSearchbarModule,
    ApsDateFilterModule,
    ApsEmptyModule,
  ],
  declarations: [ReservationListComponent, ReservationListContainerComponent, ReservationsComponent],
})
export class ReservationsModule {
  constructor(entityDataService: EntityDataService, reservationDataService: ReservationDataService) {
    entityDataService.registerService('Reservation', reservationDataService);
  }
}
