import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@arphase/ui/core';
import { User } from '@innovatech/common/domain';
import { fromAuth } from '@innovatech/ui/auth/data';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'ivt-reset-password-form-container',
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
