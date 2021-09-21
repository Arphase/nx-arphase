import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-payment-method-tab',
  templateUrl: './payment-method-tab.component.html',
  styleUrls: ['./payment-method-tab.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodTabComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
