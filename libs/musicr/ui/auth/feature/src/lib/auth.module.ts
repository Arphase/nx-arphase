import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ArphaseUiAuthModule } from '@arphase/ui/auth';
import { ApsAutoErrorModule, ApsStatusMessageModule } from '@arphase/ui/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { AuthRoutingModule } from './auth-routing.module';
import { ResetPasswordFormContainerComponent } from './containers/reset-password-form-container/reset-password-form-container.component';
import { SetPasswordFormContainerComponent } from './containers/set-password-form-container/set-password-form-container.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';

@NgModule({
  imports: [
    ApsAutoErrorModule,
    ApsStatusMessageModule,
    ArphaseUiAuthModule,
    AuthRoutingModule,
    CommonModule,
    NzButtonModule,
    NzCardModule,
    NzFormModule,
    NzGridModule,
    NzInputModule,
    NzSpaceModule,
    ReactiveFormsModule,
  ],
  declarations: [SignInFormContainerComponent, ResetPasswordFormContainerComponent, SetPasswordFormContainerComponent],
})
export class AuthModule {}
