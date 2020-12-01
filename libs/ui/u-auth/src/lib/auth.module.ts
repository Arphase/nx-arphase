import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@ivt/u-ui';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';
import { ExpiredTokenComponent } from './components/expired-token/expired-token.component';

@NgModule({
  imports: [CommonModule, IvtUiModule, AuthRoutingModule],
  declarations: [
    AuthComponent,
    SignInFormContainerComponent,
    SignInFormComponent,
    SetPasswordFormContainerComponent,
    SetPasswordFormComponent,
    ExpiredTokenComponent,
  ],
})
export class AuthModule {}
