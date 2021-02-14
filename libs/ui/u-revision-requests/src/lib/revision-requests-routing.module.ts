import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RevisionRequestsComponent } from './revision-requests.component';

export const routes: Routes = [
  {
    path: '',
    component: RevisionRequestsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RevisionRequestsRoutingModule {}
