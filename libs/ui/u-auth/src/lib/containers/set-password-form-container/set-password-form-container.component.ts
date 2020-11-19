import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from '@ivt/u-state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'ivt-set-password-form-container',
  templateUrl: './set-password-form-container.component.html',
  styleUrls: ['./set-password-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordFormContainerComponent {
  loading$ = this.loadingService.loading$;
  constructor(private store: Store<any>, private loadingService: LoadingService) {}

  submit(formValue): void {
    //this.store.dispatch(   .actions.({ }));
  }
}
