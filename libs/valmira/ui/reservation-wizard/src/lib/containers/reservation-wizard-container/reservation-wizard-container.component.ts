import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNil } from '@arphase/ui/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Actions, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';
import { selectUrl } from '@valmira/ui/core';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { filter, map, mapTo } from 'rxjs/operators';

import { getPromocodeByName, getPromocodeByNameFailed } from '../../state/reservation-wizard.actions';
import { getReservationWizardPromocode } from '../../state/reservation-wizard.selectors';

@UntilDestroy()
@Component({
  selector: 'vma-reservation-wizard-container',
  templateUrl: './reservation-wizard-container.component.html',
  styleUrls: ['./reservation-wizard-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReservationWizardContainerComponent implements OnInit {
  item$ = this.reservationCollectionService.currentItem$;
  promocode$ = this.store.pipe(select(getReservationWizardPromocode));
  promocodeNotFound$ = this.actions$.pipe(ofType(getPromocodeByNameFailed), mapTo(true));
  isInConfirmation$ = this.store.pipe(
    select(selectUrl),
    filterNil(),
    map(url => url.includes('confirmation'))
  );

  constructor(
    private reservationCollectionService: ReservationCollectionService,
    private route: ActivatedRoute,
    private store: Store,
    private actions$: Actions
  ) {}

  ngOnInit() {
    this.reservationCollectionService.removeOneFromCache(null);
    this.route.paramMap
      .pipe(
        untilDestroyed(this),
        filter(params => !!params.get('id')),
        map(params => params.get('id'))
      )
      .subscribe(id => this.reservationCollectionService.getByKey(id));
  }

  submit(payload: { promocode: string }): void {
    this.store.dispatch(getPromocodeByName({ name: payload.promocode }));
  }
}