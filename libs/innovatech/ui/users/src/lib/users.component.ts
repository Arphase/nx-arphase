import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersComponent {}
