import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui';
import { IvtStatusMessageModule } from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ExpiredTokenComponent } from './components/expired-token/expired-token.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { ResetPasswordFormContainerComponent } from './containers/reset-password-form-container/reset-password-form-container.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';
import { CompanyLogoComponent } from './components/company-logo/company-logo.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NzCardModule,
    IvtStatusMessageModule,
    NzGridModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    ApsAutoErrorModule,
    NzSpaceModule,
    NzLayoutModule,
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
    CompanyLogoComponent,
  ],
})
export class AuthModule {}