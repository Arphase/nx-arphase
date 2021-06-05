import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IvtDirtyFormGuard } from '@arphase/ui';

import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductListContainerComponent } from './containers/product-list-container/product-list-container.component';
import { ProductsComponent } from './products.component';
import { ProductResolverService } from './resolvers/product-resolver.service';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductListContainerComponent,
      },
      {
        path: 'new',
        component: ProductFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedProduct: ProductResolverService },
      },
      {
        path: ':id',
        component: ProductFormContainerComponent,
        canDeactivate: [IvtDirtyFormGuard],
        resolve: { resolvedProduct: ProductResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
