import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui';
import { VehiclesDataModule } from '@ivt/u-state';
import {
  IvtAddressFormModule,
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtEmptyModule,
  IvtPhoneModule,
  IvtRadioFilterModule,
  IvtSearchbarModule,
} from '@ivt/u-ui';
import { VehicleFormModule } from '@ivt/u-vehicles';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NgxMaskModule } from 'ngx-mask';

import { RevisionRequestFormComponent } from './components/revision-request-form/revision-request-form.component';
import { RevisionRequestListComponent } from './components/revision-request-list/revision-request-list.component';
import { RevisionRequestFormContainerComponent } from './containers/revision-request-form-container/revision-request-form-container.component';
import { RevisionRequestListContainerComponent } from './containers/revision-request-list-container/revision-request-list-container.component';
import { RevisionRequestsRoutingModule } from './revision-requests-routing.module';
import { RevisionRequestsComponent } from './revision-requests.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RevisionRequestsRoutingModule,
    IvtSearchbarModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzDividerModule,
    NzSpaceModule,
    NzPageHeaderModule,
    NzCollapseModule,
    NzAlertModule,
    VehicleFormModule,
    VehiclesDataModule,
    IvtAddressFormModule,
    ApsAutoErrorModule,
    NzFormModule,
    NzInputModule,
    NgxMaskModule,
    NzTableModule,
    IvtEmptyModule,
    NzTagModule,
    NzDropDownModule,
    NzToolTipModule,
    NzIconModule,
    IvtPhoneModule,
    IvtDateFilterModule,
    IvtCheckboxFilterModule,
    IvtRadioFilterModule,
  ],
  declarations: [
    RevisionRequestsComponent,
    RevisionRequestListContainerComponent,
    RevisionRequestFormContainerComponent,
    RevisionRequestFormComponent,
    RevisionRequestListComponent,
  ],
})
export class RevisionRequestsModule {}
