import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { OrderListContainerComponent } from './containers/order-list-container/order-list-container.component';

export const routes: Routes = [
  {
    path: '',
    component: ApsFeatureLayoutComponent,
    data: { title: 'Órdenes' },
    children: [
      {
        path: '',
        component: OrderListContainerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
