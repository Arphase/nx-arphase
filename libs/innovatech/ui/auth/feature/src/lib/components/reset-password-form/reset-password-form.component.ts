import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsValidators } from '@arphase/ui/core';
import { User } from '@innovatech/common/domain';
import { ApsFormComponent } from '@arphase/ui/core';

@Component({
  selector: 'ivt-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent extends ApsFormComponent<Partial<User>> {
  @Input() emailSent: boolean;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [ApsValidators.required, ApsValidators.email]],
    });
  }
}
