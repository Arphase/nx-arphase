import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceDetailContainerComponent } from './containers/place-detail-container/place-detail-container.component';

export const routes: Routes = [
  {
    path: ':id',
    component: PlaceDetailContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceDetailRoutingModule {}
