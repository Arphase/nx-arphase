import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@innovatech/ui';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';

@NgModule({
  imports: [CommonModule, IvtUiModule, AuthRoutingModule],
  declarations: [
    AuthComponent,
    SignInFormContainerComponent,
    SignInFormComponent,
  ],
})
export class AuthModule {}
