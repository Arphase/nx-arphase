import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vma-confirmation-container',
  templateUrl: './confirmation-container.component.html',
  styleUrls: ['./confirmation-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfirmationContainerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
