import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtDateFilterModule } from '@arphase/ui';
import { CompanyCheckboxFilterModule } from '@innovatech/ui/companies/ui';
import { GroupCheckboxFilterModule } from '@innovatech/ui/groups/ui';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { UserCheckboxFilterModule } from '@innovatech/ui/users/ui';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { DashboardContainerComponent } from './containers/dashboard-container/dashboard-container.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardEffects } from './state/dashboard.effects';
import { reducer } from './state/dashboard.reducer';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NzCardModule,
    NzIconModule,
    NzEmptyModule,
    IvtDateFilterModule,
    NzGridModule,
    NzDividerModule,
    NzSpaceModule,
    NzTypographyModule,
    NgxChartsModule,
    PermissionsModule,
    GroupCheckboxFilterModule,
    CompanyCheckboxFilterModule,
    UserCheckboxFilterModule,
    StoreModule.forFeature('dashboard', reducer),
    EffectsModule.forFeature([DashboardEffects]),
  ],
  declarations: [DashboardContainerComponent, DashboardComponent],
})
export class DashboardModule {}
