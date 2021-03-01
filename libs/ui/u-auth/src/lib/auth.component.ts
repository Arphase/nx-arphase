import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthComponent {}
