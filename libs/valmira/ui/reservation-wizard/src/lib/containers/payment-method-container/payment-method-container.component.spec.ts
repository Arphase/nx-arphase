import { RouterTestingModule } from '@angular/router/testing';
import { createComponentFactory, Spectator } from '@ngneat/spectator';
import { Actions } from '@ngrx/effects';
import { provideMockActions } from '@ngrx/effects/testing';
import { provideMockStore } from '@ngrx/store/testing';
import { ReservationCollectionService } from '@valmira/ui/reservations/data';
import { StripeService } from 'ngx-stripe';
import { Observable } from 'rxjs';

import { PaymentMethodContainerComponent } from './payment-method-container.component';

describe('PaymentMethodContainerComponent', () => {
  // eslint-disable-next-line prefer-const
  let actions$ = new Observable<Actions>();
  let spectator: Spectator<PaymentMethodContainerComponent>;
  const createComponent = createComponentFactory({
    component: PaymentMethodContainerComponent,
    imports: [RouterTestingModule],
    mocks: [ReservationCollectionService, StripeService],
    providers: [provideMockStore(), provideMockActions(() => actions$)],
    shallow: true,
  });

  beforeEach(() => (spectator = createComponent()));
  it('should create', () => {
    expect(spectator.component).toBeTruthy();
  });
});
