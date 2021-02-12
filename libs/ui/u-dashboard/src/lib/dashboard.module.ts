import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DasboardStateModule } from '@ivt/u-state';
import { IvtCheckboxFilterModule, IvtDateFilterModule } from '@ivt/u-ui';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';
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
    NzDividerModule,
    NzSpaceModule,
    NzTypographyModule,
  ],
  declarations: [DashboardContainerComponent, DashboardComponent],
})
export class DashboardModule {}
