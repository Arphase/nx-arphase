import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DasboardStateModule } from '@ivt/u-state';
import { IvtUiModule } from '@ivt/u-ui';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    IvtUiModule,
    DasboardStateModule,
    ChartsModule,
  ],
  declarations: [DashboardContainerComponent, DashboardComponent],
})
export class DashboardModule {}
