import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { DasboardStateModule } from '@ivt/u-state';
import { IvtCheckboxFilterModule, IvtDateFilterModule } from '@ivt/u-ui';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
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
    NzCardModule,
    NzIconModule,
    NzEmptyModule,
    IvtDateFilterModule,
    IvtCheckboxFilterModule,
    NzGridModule,
  ],
  declarations: [DashboardContainerComponent, DashboardComponent],
})
export class DashboardModule {}
