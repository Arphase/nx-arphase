import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { PlaceFormContainerComponent } from './containers/place-form-container/place-form-container.component';
import { PlaceListContainerComponent } from './containers/place-list-container/place-list-container.component';
import { PlaceResolverService } from './resolvers/place-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Alojamientos' },
    children: [
      {
        path: '',
        component: PlaceListContainerComponent,
      },
      {
        path: 'new',
        component: PlaceFormContainerComponent,
        resolve: { resolvedItem: PlaceResolverService },
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
