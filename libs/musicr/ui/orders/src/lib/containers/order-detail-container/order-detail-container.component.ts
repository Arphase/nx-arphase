import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mrl-order-detail-container',
  templateUrl: './order-detail-container.component.html',
  styleUrls: ['./order-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderDetailContainerComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
