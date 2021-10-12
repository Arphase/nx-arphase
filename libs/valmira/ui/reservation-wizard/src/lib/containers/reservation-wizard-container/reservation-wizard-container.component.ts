import { ChangeDetectionStrategy, Component } from '@angular/core';
import { filterNil } from '@arphase/ui/core';
import { UntilDestroy } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { selectUrl } from '@valmira/ui/core';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { map, mapTo } from 'rxjs/operators';

import { getPromocodeByName, getPromocodeByNameFailed } from '../../state/reservation-wizard.actions';
import { getReservationWizardPromocode } from '../../state/reservation-wizard.selectors';

@UntilDestroy()
@Component({
  selector: 'vma-reservation-wizard-container',
  templateUrl: './reservation-wizard-container.component.html',
  styleUrls: ['./reservation-wizard-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationWizardContainerComponent {
  item$ = this.reservationCollectionService.currentItem$;
  promocode$ = this.store.pipe(select(getReservationWizardPromocode));
  promocodeNotFound$ = this.actions$.pipe(ofType(getPromocodeByNameFailed), mapTo(true));
  isInConfirmation$ = this.store.pipe(
    select(selectUrl),
    filterNil(),
    map(url => url.includes('confirmation'))
  );
  disablePaymentMethod$ = this.item$.pipe(map(item => !item?.customer?.id));
  disableConfirmation$ = this.item$.pipe(map(item => !item?.paymentId));

  constructor(
    private reservationCollectionService: ReservationCollectionService,
    private store: Store,
    private actions$: Actions
  ) {}

  submit(payload: { promocode: string }): void {
    this.store.dispatch(getPromocodeByName({ name: payload.promocode }));
  }
}
