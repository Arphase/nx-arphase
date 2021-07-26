import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SignInFormContainerComponent } from './containers/sign-in-form-container/sign-in-form-container.component';

export const routes: Routes = [
  {
    path: '',
    component: SignInFormContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
