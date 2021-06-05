import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ApsValidators } from '@arphase/ui';
import { User } from '@innovatech/common/domain';
import { IvtFormComponent } from '@innovatech/ui/core/data';

@Component({
  selector: 'ivt-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent extends IvtFormComponent<Partial<User>> {
  @Input() emailSent: boolean;

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [ApsValidators.required, ApsValidators.email]],
    });
  }
}
