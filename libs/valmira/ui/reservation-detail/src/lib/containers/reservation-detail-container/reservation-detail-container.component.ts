import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { getReservationDetailReservationState } from '../../state/reservation-detail.selectors';

@Component({
  selector: 'vma-reservation-detail-container',
  templateUrl: './reservation-detail-container.component.html',
  styleUrls: ['./reservation-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationDetailContainerComponent {
  item$ = this.store.pipe(select(getReservationDetailReservationState));
  constructor(private store: Store) {}
}
