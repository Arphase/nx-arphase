import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PlaceFormContainerComponent } from './containers/place-form-container/place-form-container.component';
import { PlaceListContainerComponent } from './containers/place-list-container/place-list-container.component';
import { PlacesComponent } from './places.component';
import { PlaceResolverService } from './resolvers/place-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: PlacesComponent,
    children: [
      {
        path: '',
        component: PlaceListContainerComponent,
      },
      {
        path: 'new',
        component: PlaceFormContainerComponent,
      },
      {
        path: ':id',
        component: PlaceFormContainerComponent,
        resolve: { resolvedItem: PlaceResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlacesRoutingModule {}
