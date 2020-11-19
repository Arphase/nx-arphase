import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Group, UserRoles } from '@ivt/c-data';
import { CustomValidators } from '@ivt/c-utils';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-group-form-users',
  templateUrl: './group-form-users.component.html',
  styleUrls: ['./group-form-users.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupFormUsersComponent extends IvtFormComponent<Group> {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      id: null,
      name: [null, Validators.required],
      lastName: [null, Validators.required],
      secondLastName: null,
      email: [null, Validators.required],
      phone: [null, Validators.required],
      businessRole: UserRoles[UserRoles.agencyUser],
      rfc: [null, [Validators.required, CustomValidators.rfc('any')]],
    });
  }
}
