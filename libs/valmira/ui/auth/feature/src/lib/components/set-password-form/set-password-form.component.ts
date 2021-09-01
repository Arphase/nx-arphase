import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { specialCharactersForPassword } from '@arphase/common';
import { ApsFormComponent, ApsValidators, MessageStatus } from '@arphase/ui/core';

@Component({
  selector: 'vma-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordFormComponent extends ApsFormComponent<{ password: string }> {
  messageStatus = MessageStatus;
  specialCharacters = specialCharactersForPassword.join(' ');

  get passwordControl(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get passwordConfirmControl(): FormControl {
    return this.form.get('passwordConfirm') as FormControl;
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
  constructor(private fb: FormBuilder) {
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
