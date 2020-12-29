import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-expired-token',
  templateUrl: './expired-token.component.html',
  styleUrls: ['./expired-token.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExpiredTokenComponent {}
