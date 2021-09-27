import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-payment-method-tab-container',
  templateUrl: './payment-method-tab-container.component.html',
  styleUrls: ['./payment-method-tab-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodTabContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
