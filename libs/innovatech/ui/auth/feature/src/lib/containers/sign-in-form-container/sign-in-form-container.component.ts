import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SignInRequest } from '@innovatech/common/domain';
import { fromAuth } from '@innovatech/ui/auth/data';
import { LoadingService } from '@innovatech/ui/core/data';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-sign-in-form-container',
  templateUrl: './sign-in-form-container.component.html',
  styleUrls: ['./sign-in-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInFormContainerComponent {
  loading$ = this.loadingService.loading$;

  constructor(private store: Store, private loadingService: LoadingService) {}

  submit(payload: SignInRequest): void {
    this.store.dispatch(fromAuth.actions.signIn({ payload }));
  }
}