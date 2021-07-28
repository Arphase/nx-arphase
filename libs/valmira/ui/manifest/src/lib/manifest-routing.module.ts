import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManifestComponent } from './manifest.component';

export const routes: Routes = [
  {
    path: '',
    component: ManifestComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManifestRoutingModule {}
