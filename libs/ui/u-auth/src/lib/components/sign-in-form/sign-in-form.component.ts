import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { SignInRequest } from '@ivt/c-data';
import { IvtFormComponent, IvtValidators } from '@ivt/u-ui';

@Component({
  selector: 'ivt-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent extends IvtFormComponent<SignInRequest> {
  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [Validators.required, IvtValidators.email]],
      password: [null, Validators.required],
    });
  }
}
