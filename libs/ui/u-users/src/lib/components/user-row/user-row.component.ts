import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-user-row',
  templateUrl: './user-row.component.html',
  styleUrls: ['./user-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserRowComponent extends IvtRowComponent<User> {}
