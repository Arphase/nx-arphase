import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SetPasswordPayload } from '@ivt/c-data';
import { fromAuth, LoadingService } from '@ivt/u-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-set-password-form-container',
  templateUrl: './set-password-form-container.component.html',
  styleUrls: ['./set-password-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordFormContainerComponent {
  loading$ = this.loadingService.loading$;
  constructor(private store: Store<any>, private loadingService: LoadingService, private route: ActivatedRoute) {}

  submit(formValue: { password: string }): void {
    const payload: SetPasswordPayload = {
      email: this.route.snapshot.params.email,
      passwordToken: this.route.snapshot.params.passwordToken,
      password: formValue.password,
    };
    this.store.dispatch(fromAuth.actions.setPassword({ payload }));
  }
}
