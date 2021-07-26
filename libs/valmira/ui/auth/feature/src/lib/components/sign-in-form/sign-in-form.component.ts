import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui';
import { SignInPayload } from '@valmira/ui/auth/data';

@Component({
  selector: 'vma-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent extends ApsFormComponent<SignInPayload> {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [ApsValidators.required, ApsValidators.email]],
      password: [null, ApsValidators.required],
    });
  }
}
