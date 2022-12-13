import { MediaMatcher } from '@angular/cdk/layout';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { StripeCardElementOptions, StripeCardNumberElement, StripeElementsOptions } from '@stripe/stripe-js';
import { StripeCardNumberComponent } from 'ngx-stripe';

@Component({
  selector: 'vma-payment-method',
  templateUrl: './payment-method.component.html',
  styleUrls: ['./payment-method.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodComponent {
  @ViewChild(StripeCardNumberComponent) card: StripeCardNumberComponent;
  @Input() errorMessage: string;
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
  mobileCardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#1D2B15',
        fontWeight: '300',
        fontSize: '24px',
        '::placeholder': {
          color: 'rgba(29, 43, 21, 0.4)',
        },
      },
    },
  };
  elementsOptions: StripeElementsOptions = { locale: 'es' };
  private _mobileQueryListener: () => void;
  mobileQuery: MediaQueryList;

  @Output() payReservation = new EventEmitter<StripeCardNumberElement>();

  constructor(private cdr: ChangeDetectorRef, private media: MediaMatcher) {
    this.mobileQuery = this.media.matchMedia('(max-width: 769px)');
    this._mobileQueryListener = () => this.cdr.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  pay(): void {
    this.payReservation.emit(this.card.element);
  }
}
