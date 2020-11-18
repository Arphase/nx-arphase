import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductFormContainerComponent } from './containers/product-form-container/product-form-container.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductFormContainerComponent,
      },
      {
        path: 'new',
        component: ProductFormContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule { }
