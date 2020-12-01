import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { ExpiredTokenComponent } from './components/expired-token/expired-token.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';
import { SetPasswordGuard } from './guards/set-password.guard';
import { SetPasswordResolverService } from './resolvers/set-password-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: AuthComponent,
    children: [
      {
        path: 'sign-in',
        component: SignInFormContainerComponent,
      },
      {
        path: 'set-password/:passwordToken/:userId',
        component: SetPasswordFormContainerComponent,
        canActivate: [SetPasswordGuard],
        resolve: { resolvedRoute: SetPasswordResolverService },
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
