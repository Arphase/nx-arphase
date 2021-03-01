import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInRequest } from '@ivt/c-data';
import { fromAuth, IvtState, LoadingService } from '@ivt/u-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-sign-in-form-container',
  templateUrl: './sign-in-form-container.component.html',
  styleUrls: ['./sign-in-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormContainerComponent {
  loading$ = this.loadingService.loading$;

  constructor(private store: Store<IvtState>, private loadingService: LoadingService) {}

  submit(payload: SignInRequest): void {
    this.store.dispatch(fromAuth.actions.signIn({ payload }));
  }
}
