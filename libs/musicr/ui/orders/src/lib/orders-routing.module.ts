import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApsDirtyFormGuard, ApsFeatureLayoutComponent } from '@arphase/ui/core';

import { OrderFormContainerComponent } from './containers/order-form-container/order-form-container.component';
import { OrderListContainerComponent } from './containers/order-list-container/order-list-container.component';
import { OrderResolverService } from './resolvers/order-resolver.service';

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
      {
        path: 'new',
        component: OrderFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedOrder: OrderResolverService },
      },
      {
        path: ':id',
        component: OrderFormContainerComponent,
        canDeactivate: [ApsDirtyFormGuard],
        resolve: { resolvedOrder: OrderResolverService },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
