import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { StripeCardNumberElement } from '@stripe/stripe-js';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { StripeService } from 'ngx-stripe';
import { BehaviorSubject, finalize, switchMap, take, withLatestFrom } from 'rxjs';

import {
  createPaymentIntent,
  createPaymentIntentFailed,
  createPaymentIntentSuccess,
} from '../../state/reservation-wizard.actions';

@Component({
  selector: 'vma-payment-method-container',
  templateUrl: './payment-method-container.component.html',
  styleUrls: ['./payment-method-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodContainerComponent {
  loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();

  errorMessageSubject = new BehaviorSubject<string>(null);
  errorMessage$ = this.errorMessageSubject.asObservable();

  constructor(
    private actions$: Actions,
    private reservationCollectionService: ReservationCollectionService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store,
    private stripeService: StripeService
  ) {}

  payReservation(element: StripeCardNumberElement): void {
    this.loadingSubject.next(true);
    this.actions$
      .pipe(
        ofType(createPaymentIntentSuccess),
        take(1),
        switchMap(({ key, reservation }) =>
          this.stripeService.confirmCardPayment(key, {
            payment_method: {
              card: element,
              billing_details: { name: `Valmira reservación - ${reservation?.place?.name}` },
            },
          })
        ),
        finalize(() => this.loadingSubject.next(false)),
        withLatestFrom(this.reservationCollectionService.currentItem$)
      )
      .subscribe(([result, reservation]) => {
        if (result.error) {
          this.errorMessageSubject.next(result.error.message);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            this.reservationCollectionService.update({ id: reservation.id, paymentId: result.paymentIntent.id });
            this.router.navigate(['..', 'confirmation'], { relativeTo: this.route });
          }
        }
      });

    this.actions$.pipe(ofType(createPaymentIntentFailed), take(1)).subscribe(() => {
      this.errorMessageSubject.next('Esta reservación ya está pagada');
      this.loadingSubject.next(false);
    });

    this.reservationCollectionService.currentItem$
      .pipe(take(1))
      .subscribe(reservation => this.store.dispatch(createPaymentIntent({ reservationId: reservation.id })));
  }
}
