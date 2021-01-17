import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '@ivt/c-data';
import { IvtFormComponent, IvtValidators } from '@ivt/u-ui';

@Component({
  selector: 'ivt-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent extends IvtFormComponent<Partial<User>> {
  @Input() emailSent: boolean;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [Validators.required, IvtValidators.email]],
    });
  }
}
