import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteLocalStorageGuard, ExpiredTokenComponent } from '@arphase/ui/auth';
import { SpaGuard } from '@valmira/ui/auth/data';

import { ResetPasswordFormContainerComponent } from './containers/reset-password-form-container/reset-password-form-container.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';
import { SetPasswordResolverService } from './resolvers/set-password-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: SignInFormContainerComponent,
  },
  {
    path: 'reset-password',
    component: ResetPasswordFormContainerComponent,
    canActivate: [SpaGuard],
  },
  {
    path: 'set-password/:passwordToken/:userId',
    component: SetPasswordFormContainerComponent,
    canActivate: [DeleteLocalStorageGuard],
    resolve: { resolvedActions: SetPasswordResolverService },
  },
  {
    path: 'expired-token',
    component: ExpiredTokenComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
