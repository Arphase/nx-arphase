import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'ivt-guarantee-list-container',
  templateUrl: './guarantee-list-container.component.html',
  styleUrls: ['./guarantee-list-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GuaranteeListContainerComponent implements OnInit {
  list = [{}];
  constructor() { }

  ngOnInit(): void {
  }

}
