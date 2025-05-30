import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'aps-expired-token',
  templateUrl: './expired-token.component.html',
  styleUrls: ['./expired-token.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class ExpiredTokenComponent {}
