import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { ApsFormComponent } from '@arphase/ui/forms';

@Component({
  selector: 'ivt-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class UserFormComponent extends ApsFormComponent<Group> {}
