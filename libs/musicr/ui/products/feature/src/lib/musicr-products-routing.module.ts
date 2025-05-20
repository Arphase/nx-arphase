import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'category/:id',
    loadComponent: () =>
      import('./containers/products-catalog-container/products-catalog-container.component').then(
        m => m.ProductsCatalogContainerComponent,
      ),
  },
  {
    path: 'subcategory/:id',
    loadComponent: () =>
      import('./containers/products-catalog-container/products-catalog-container.component').then(
        m => m.ProductsCatalogContainerComponent,
      ),
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./containers/product-detail-container/product-detail-container.component').then(
        m => m.ProductDetailContainerComponent,
      ),
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicrProductsRoutingModule {}
