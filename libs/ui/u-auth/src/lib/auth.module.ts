import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import { IvtFormFieldModule, IvtInputModule, IvtStatusMessageModule } from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ExpiredTokenComponent } from './components/expired-token/expired-token.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { ResetPasswordFormContainerComponent } from './containers/reset-password-form-container/reset-password-form-container.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NzCardModule,
    IvtFormFieldModule,
    IvtInputModule,
    IvtStatusMessageModule,
    NzGridModule,
    NzButtonModule,
  ],
  declarations: [
    AuthComponent,
    SignInFormContainerComponent,
    SignInFormComponent,
    SetPasswordFormContainerComponent,
    SetPasswordFormComponent,
    ExpiredTokenComponent,
    ResetPasswordFormContainerComponent,
    ResetPasswordFormComponent,
  ],
})
export class AuthModule {}
