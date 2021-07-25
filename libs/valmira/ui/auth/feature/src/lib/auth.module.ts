import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSpaceModule } from 'ng-zorro-antd/space';

import { AuthRoutingModule } from './auth-routing.module';
import { SignInFormComponent } from './components/sign-in-form/sign-in-form.component';
import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    NzGridModule,
    NzCardModule,
    NzFormModule,
    NzButtonModule,
    NzInputModule,
    NzSpaceModule,
    ApsAutoErrorModule,
  ],
  declarations: [SignInFormContainerComponent, SignInFormComponent],
})
export class AuthModule {}
