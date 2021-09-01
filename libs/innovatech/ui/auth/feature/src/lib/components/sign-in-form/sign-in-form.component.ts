import { ChangeDetectionStrategy, Component } from '@angular/core';
import { createSignInForm, SignInPayload } from '@arphase/ui/auth';
import { ApsFormComponent } from '@arphase/ui/core';

@Component({
  selector: 'ivt-sign-in-form',
  templateUrl: './sign-in-form.component.html',
  styleUrls: ['./sign-in-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormComponent extends ApsFormComponent<SignInPayload> {
  form = createSignInForm();
}
