import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { AdditionalProductFormContainerComponent } from './containers/additional-product-form-container/additional-product-form-container.component';
import { AdditionalProductListContainerComponent } from './containers/additional-product-list-container/additional-product-list-container.component';
import { AdditionalProductResolverService } from './resolvers/additional-product-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Productos Adicionales' },
    children: [
      {
        path: '',
        component: AdditionalProductListContainerComponent,
      },
      {
        path: 'new',
        component: AdditionalProductFormContainerComponent,
      },
      {
        path: ':id',
        component: AdditionalProductFormContainerComponent,
        resolve: { resolvedPromocode: AdditionalProductResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdditionalProductsRoutingModule {}
