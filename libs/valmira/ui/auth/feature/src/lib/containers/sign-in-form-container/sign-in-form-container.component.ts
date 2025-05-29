import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInPayload } from '@arphase/ui/auth';
import { LoadingService } from '@arphase/ui/core';
import { Store } from '@ngrx/store';
import { fromAuth } from '@valmira/ui/auth/data';

@Component({
  selector: 'vma-sign-in-form-container',
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
