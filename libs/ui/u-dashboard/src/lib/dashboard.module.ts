import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { DasboardStateModule } from '@ivt/u-state';
import { IvtCheckboxFilterModule, IvtDateFilterModule, IvtEmptyStateModule } from '@ivt/u-ui';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    DasboardStateModule,
    ChartsModule,
    MatCardModule,
    MatIconModule,
    IvtEmptyStateModule,
    IvtDateFilterModule,
    IvtCheckboxFilterModule,
  ],
  declarations: [DashboardContainerComponent, DashboardComponent],
})
export class DashboardModule {}
