import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserFormComponent extends IvtFormComponent<Group> {}