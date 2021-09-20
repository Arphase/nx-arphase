import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ApsAutoErrorModule, ApsStatusMessageModule } from '@arphase/ui/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { ExpiredTokenComponent } from './components/expired-token/expired-token.component';
import { ResetPasswordFormComponent } from './components/reset-password-form/reset-password-form.component';
import { SetPasswordFormComponent } from './components/set-password-form/set-password-form.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';

const COMPONENTS = [ExpiredTokenComponent, SignInFormComponent, SetPasswordFormComponent, ResetPasswordFormComponent];
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzIconModule,
    NzFormModule,
    NzInputModule,
    ApsAutoErrorModule,
    NzSpaceModule,
    ApsStatusMessageModule,
  ],
  declarations: [COMPONENTS],
  exports: [COMPONENTS],
})
export class ArphaseUiAuthModule {}
