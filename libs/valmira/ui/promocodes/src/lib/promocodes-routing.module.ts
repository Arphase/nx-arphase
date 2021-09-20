import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { PromocodeFormContainerComponent } from './containers/promocode-form-container/promocode-form-container.component';
import { PromocodeListContainerComponent } from './containers/promocode-list-container/promocode-list-container.component';
import { PromocodeResolverService } from './resolvers/promocode-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Promocodes' },
    children: [
      {
        path: '',
        component: PromocodeListContainerComponent,
      },
      {
        path: 'new',
        component: PromocodeFormContainerComponent,
        resolve: { resolvedPromocode: PromocodeResolverService },
      },
      {
        path: ':id',
        component: PromocodeFormContainerComponent,
        resolve: { resolvedPromocode: PromocodeResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PromocodesRoutingModule {}
