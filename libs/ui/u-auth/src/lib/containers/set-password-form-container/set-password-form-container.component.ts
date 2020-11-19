import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SignInRequest } from '@ivt/c-data';
import { fromAuth, LoadingService } from '@ivt/u-state';
import { Store } from '@ngrx/store';
import { AuthComponent } from '../../auth.component';
import { AuthModule } from '../../auth.module';

@Component({
  selector: 'ivt-set-password-form-container',
  templateUrl: './set-password-form-container.component.html',
  styleUrls: ['./set-password-form-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SetPasswordFormContainerComponent {
  loading$ = this.loadingService.loading$;
  constructor(
    private store: Store<any>,
    private loadingService: LoadingService,
  ) {}
  submit(): void {
    
   //this.store.dispatch(   .actions.({ }));
  }
}
