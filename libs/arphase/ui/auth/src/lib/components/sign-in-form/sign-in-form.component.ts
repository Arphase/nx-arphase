import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { ApsFormComponent, ApsValidators } from '@arphase/ui/forms';

import { SignInPayload } from '../../models/sign-in-payload';

@Component({
  selector: 'aps-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent extends ApsFormComponent<SignInPayload> {
  @Input() title: string;
  constructor(private fb: UntypedFormBuilder) {
    super();
    this.form = this.fb.group({
      email: [null, [ApsValidators.required, ApsValidators.email]],
      password: [null, ApsValidators.required],
    });
  }
}
