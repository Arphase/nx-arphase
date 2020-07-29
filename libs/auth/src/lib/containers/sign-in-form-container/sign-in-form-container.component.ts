import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInRequest } from '@innovatech/data';
import { fromAuth } from '@innovatech/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-sign-in-form-container',
  templateUrl: './sign-in-form-container.component.html',
  styleUrls: ['./sign-in-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormContainerComponent {
  constructor(private store: Store<any>) {}
  submit(payload: SignInRequest): void {
    this.store.dispatch(fromAuth.actions.signIn({ payload }));
  }
}
