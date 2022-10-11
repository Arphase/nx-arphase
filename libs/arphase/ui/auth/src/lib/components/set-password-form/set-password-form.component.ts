import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl } from '@angular/forms';
import { specialCharactersForPassword } from '@arphase/common';
import { ApsFormComponent, ApsValidators, MessageStatus } from '@arphase/ui/core';

@Component({
  selector: 'aps-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordFormComponent extends ApsFormComponent<{ password: string }> {
  @Input() title: string;
  messageStatus = MessageStatus;
  specialCharacters = specialCharactersForPassword.join(' ');

  get passwordControl(): UntypedFormControl {
    return this.form.get('password') as UntypedFormControl;
  }

  get passwordConfirmControl(): UntypedFormControl {
    return this.form.get('passwordConfirm') as UntypedFormControl;
  }

  get minLengthStatus(): MessageStatus {
    return this.getErrorStatus(
      this.passwordControl.dirty,
      this.passwordControl.hasError('minLength') || this.passwordControl.hasError('required')
    );
  }

  get uppercaseStatus(): MessageStatus {
    return this.getErrorStatus(this.passwordControl.dirty, this.passwordControl.hasError('uppercase'));
  }

  get specialCharacterStatus(): MessageStatus {
    return this.getErrorStatus(this.passwordControl.dirty, this.passwordControl.hasError('specialCharacter'));
  }

  get matchPasswordsError(): boolean {
    return this.form.hasError('matchPasswords') && this.passwordControl.dirty && this.passwordConfirmControl.dirty;
  }
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.form = this.fb.group(
      {
        password: [
          null,
          [ApsValidators.required, ApsValidators.minLength(8), ApsValidators.uppercase, ApsValidators.specialCharacter],
        ],
        passwordConfirm: [null, ApsValidators.required],
      },
      { validators: ApsValidators.matchPasswords('password', 'passwordConfirm') }
    );
  }

  getErrorStatus(dirty: boolean, hasError: boolean): MessageStatus {
    if (!dirty) {
      return MessageStatus.warning;
    }
    return hasError ? MessageStatus.error : MessageStatus.success;
  }
}
