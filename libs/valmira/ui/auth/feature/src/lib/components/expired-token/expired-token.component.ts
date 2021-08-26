import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'vma-expired-token',
  templateUrl: './expired-token.component.html',
  styleUrls: ['./expired-token.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExpiredTokenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
