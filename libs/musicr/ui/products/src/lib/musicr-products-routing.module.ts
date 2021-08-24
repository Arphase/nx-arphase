import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductDetailContainerComponent } from './containers/product-detail-container/product-detail-container.component';
import { ProductsCatalogContainerComponent } from './containers/products-catalog-container/products-catalog-container.component';

const routes: Routes = [
  {
    path: 'category/:id',
    component: ProductsCatalogContainerComponent,
  },
  {
    path: 'subcategory/:id',
    component: ProductsCatalogContainerComponent,
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
