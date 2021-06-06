import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { SignInRequest } from '@innovatech/common/domain';
import { IvtFormComponent } from '@innovatech/ui/core/data';

@Component({
  selector: 'ivt-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent extends IvtFormComponent<SignInRequest> {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [ApsValidators.required, ApsValidators.email]],
      password: [null, ApsValidators.required],
    });
  }
}
