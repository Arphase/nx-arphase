import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';

@Component({
  selector: 'aps-reset-password-form',
  templateUrl: './reset-password-form.component.html',
  styleUrls: ['./reset-password-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormComponent extends ApsFormComponent<{ email: string }> {
  @Input() emailSent: boolean;

  constructor(private fb: UntypedFormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [ApsValidators.required, ApsValidators.email]],
    });
  }
}
