import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@arphase/ui';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { User } from '@valmira/domain';
import { fromAuth } from '@valmira/ui/auth/data';
import { mapTo } from 'rxjs';

@Component({
  selector: 'vma-reset-password-form-container',
  templateUrl: './reset-password-form-container.component.html',
  styleUrls: ['./reset-password-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormContainerComponent {
  emailSent$ = this.actions$.pipe(ofType(fromAuth.actions.sendPasswordEmailSuccess), mapTo(true));
  loading$ = this.loadingService.loading$;

  constructor(private store: Store, private actions$: Actions, private loadingService: LoadingService) {}

  submit(payload: Partial<User>): void {
    this.store.dispatch(fromAuth.actions.sendPasswordEmail({ payload }));
  }
}