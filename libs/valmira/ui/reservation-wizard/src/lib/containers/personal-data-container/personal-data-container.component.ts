import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EntityOp, ofEntityOp } from '@ngrx/data';
import { select, Store } from '@ngrx/store';
import { Reservation } from '@valmira/domain';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { take } from 'rxjs/operators';

import { getCustomerByEmail } from '../../state/reservation-wizard.actions';
import { getReservationWizardCurrentCustomer } from '../../state/reservation-wizard.selectors';

@Component({
  selector: 'vma-personal-data-container',
  templateUrl: './personal-data-container.component.html',
  styleUrls: ['./personal-data-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalDataContainerComponent {
  item$ = this.reservationCollectionService.currentItem$;
  currentCustomer$ = this.store.pipe(select(getReservationWizardCurrentCustomer));
  loading$ = this.reservationCollectionService.loadingModify$;

  constructor(
    private reservationCollectionService: ReservationCollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store
  ) {}

  emailChanges(email: string): void {
    this.store.dispatch(getCustomerByEmail({ email }));
  }

  submit(payload: Reservation) {
    this.reservationCollectionService.entityActions$
      .pipe(ofEntityOp(EntityOp.SAVE_UPDATE_ONE_SUCCESS), take(1))
      .subscribe(() => this.router.navigate(['..', 'payment-method'], { relativeTo: this.route }));
    this.reservationCollectionService.update(payload);
  }
}
