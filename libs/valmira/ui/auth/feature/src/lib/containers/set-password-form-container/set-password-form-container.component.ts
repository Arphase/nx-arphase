import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingService } from '@arphase/ui/core';
import { Store } from '@ngrx/store';
import { fromAuth, SetPasswordPayload } from '@valmira/ui/auth/data';

@Component({
  selector: 'vma-set-password-form-container',
  templateUrl: './set-password-form-container.component.html',
  styleUrls: ['./set-password-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class SetPasswordFormContainerComponent {
  loading$ = this.loadingService.loading$;
  constructor(
    private store: Store,
    private loadingService: LoadingService,
    private route: ActivatedRoute,
  ) {}

  submit(formValue: { password: string }): void {
    const payload: SetPasswordPayload = {
      userId: Number(this.route.snapshot.params.userId),
      passwordToken: this.route.snapshot.params.passwordToken,
      password: formValue.password,
    };
    this.store.dispatch(fromAuth.actions.setPassword({ payload }));
  }
}
