import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-set-password-form',
  templateUrl: './set-password-form.component.html',
  styleUrls: ['./set-password-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SetPasswordFormComponent extends IvtFormComponent {

  constructor(private fb: FormBuilder) {
    super();
    this.form = this.fb.group({
      password: [null, Validators.required],
      passwordConfirm: [null, Validators.required],
    });
  }


}
