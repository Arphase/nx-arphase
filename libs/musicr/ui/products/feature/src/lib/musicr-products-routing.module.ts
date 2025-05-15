import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailContainerComponent } from './containers/product-detail-container/product-detail-container.component';

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
    component: ProductDetailContainerComponent,
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MusicrProductsRoutingModule {}
