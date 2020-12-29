import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { specialCharactersForPassword } from '@ivt/c-data';
import { IvtFormComponent, IvtValidators, MessageStatus } from '@ivt/u-ui';

@Component({
  selector: 'ivt-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordFormComponent extends IvtFormComponent<{ password: string }> {
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
          [Validators.required, Validators.minLength(8), IvtValidators.uppercase, IvtValidators.specialCharacter],
        ],
        passwordConfirm: [null, Validators.required],
      },
      { validators: IvtValidators.matchPasswords('password', 'passwordConfirm') }
    );
  }

  getErrorStatus(dirty: boolean, hasError: boolean): MessageStatus {
    if (!dirty) {
      return MessageStatus.normal;
    }
    return hasError ? MessageStatus.error : MessageStatus.success;
  }
}
