import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@ivt/c-data';
import { fromAuth, IvtState, LoadingService } from '@ivt/u-state';
import { Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mapTo } from 'rxjs/operators';

@Component({
  selector: 'ivt-reset-password-form-container',
  templateUrl: './reset-password-form-container.component.html',
  styleUrls: ['./reset-password-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ResetPasswordFormContainerComponent {
  emailSent$ = this.actions$.pipe(ofType(fromAuth.actions.sendPasswordEmailSuccess), mapTo(true));
  loading$ = this.loadingService.loading$;

  constructor(private store: Store<IvtState>, private actions$: Actions, private loadingService: LoadingService) {}

  submit(payload: Partial<User>): void {
    this.store.dispatch(fromAuth.actions.sendPasswordEmail({ payload }));
  }
}