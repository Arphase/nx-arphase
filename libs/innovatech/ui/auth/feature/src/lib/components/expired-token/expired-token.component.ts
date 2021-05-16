import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-expired-token',
  templateUrl: './expired-token.component.html',
  styleUrls: ['./expired-token.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpiredTokenComponent {}
