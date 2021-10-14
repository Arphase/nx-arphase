import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LandingContainerComponent } from './containers/landing-container/landing-container.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LandingRoutingModule {}
