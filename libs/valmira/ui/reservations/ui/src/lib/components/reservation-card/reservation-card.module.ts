import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { ReservationCardComponent } from './reservation-card.component';

@NgModule({
  declarations: [ReservationCardComponent],
  imports: [CommonModule, NzGridModule],
  exports: [ReservationCardComponent],
})
export class ReservationCardModule {}
