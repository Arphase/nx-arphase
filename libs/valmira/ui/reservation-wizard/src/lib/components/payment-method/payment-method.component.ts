import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { ApsFormComponent } from '@arphase/ui/core';
import { StripeCardElementOptions, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent } from 'ngx-stripe';

@Component({
  selector: 'vma-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodComponent extends ApsFormComponent {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#1D2B15',
        fontWeight: '300',
        fontSize: '36px',
        '::placeholder': {
          color: 'rgba(29, 43, 21, 0.4)',
        },
      },
    },
  };

  elementsOptions: StripeElementsOptions = { locale: 'es' };

  pay(): void {
    console.log(this.card.element);
  }
}
