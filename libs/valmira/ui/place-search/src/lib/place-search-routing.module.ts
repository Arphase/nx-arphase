import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceSearchContainerComponent } from './containers/place-search-container/place-search-container.component';

export const routes: Routes = [
  {
    path: '',
    component: PlaceSearchContainerComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlaceSearchRoutingModule {}
