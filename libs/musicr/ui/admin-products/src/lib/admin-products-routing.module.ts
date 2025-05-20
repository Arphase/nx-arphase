import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductResolverService } from './resolvers/product-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Productos' },
    children: [
      {
        path: '',
        component: ProductListContainerComponent,
      },
      {
        path: 'new',
        component: ProductFormContainerComponent,
        resolve: { resolvedProduct: ProductResolverService },
      },
      {
        path: ':id',
        component: ProductFormContainerComponent,
        resolve: { resolvedProduct: ProductResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminProductsRoutingModule {}
