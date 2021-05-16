import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetPasswordGuard, SpaGuard } from '@innovatech/ui/auth/data-access';

import { AuthComponent } from './auth.component';
import { ExpiredTokenComponent } from './components/expired-token/expired-token.component';
import { ResetPasswordFormContainerComponent } from './containers/reset-password-form-container/reset-password-form-container.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';
import { SetPasswordResolverService } from './resolvers/set-password-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInFormContainerComponent,
        canActivate: [SpaGuard],
      },
      {
        path: 'reset-password',
        component: ResetPasswordFormContainerComponent,
        canActivate: [SpaGuard],
      },
      {
        path: 'set-password/:passwordToken/:userId',
        component: SetPasswordFormContainerComponent,
        canActivate: [SetPasswordGuard],
        resolve: { resolvedActions: SetPasswordResolverService },
      },
      {
        path: 'expired-token',
        component: ExpiredTokenComponent,
      },
      {
        path: '',
        redirectTo: 'sign-in',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
