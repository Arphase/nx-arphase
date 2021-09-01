import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PromocodeFormContainerComponent } from './containers/promocode-form-container/promocode-form-container.component';
import { PromocodeListContainerComponent } from './containers/promocode-list-container/promocode-list-container.component';
import { PromocodesComponent } from './promocodes.component';
import { PromocodeResolverService } from './resolvers/promocode-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: PromocodesComponent,
    children: [
      {
        path: '',
        component: PromocodeListContainerComponent,
      },
      {
        path: 'new',
        component: PromocodeFormContainerComponent,
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
