import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vma-payment-method-container',
  templateUrl: './payment-method-container.component.html',
  styleUrls: ['./payment-method-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaymentMethodContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
