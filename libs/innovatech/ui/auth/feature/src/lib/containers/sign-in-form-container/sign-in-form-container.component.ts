import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInPayload } from '@arphase/ui/auth';
import { LoadingService } from '@arphase/ui/core';
import { fromAuth } from '@innovatech/ui/auth/data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-sign-in-form-container',
  templateUrl: './sign-in-form-container.component.html',
  styleUrls: ['./sign-in-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SignInFormContainerComponent {
  loading$ = this.loadingService.loading$;

  constructor(
    private store: Store,
    private loadingService: LoadingService,
  ) {}

  submit(payload: SignInPayload): void {
    this.store.dispatch(fromAuth.actions.signIn({ payload }));
  }
}
