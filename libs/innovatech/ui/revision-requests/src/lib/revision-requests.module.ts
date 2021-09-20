import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ApsAutoErrorModule,
  ApsCheckboxFilterModule,
  ApsDateFilterModule,
  ApsEmptyModule,
  ApsFeatureLayoutModule,
  ApsPhoneModule,
  ApsRadioFilterModule,
  ApsSearchbarModule,
} from '@arphase/ui/core';
import { IvtAddressFormModule } from '@innovatech/ui/addresses/ui';
import { CompanyCheckboxFilterModule } from '@innovatech/ui/companies/ui';
import { GroupCheckboxFilterModule } from '@innovatech/ui/groups/ui';
import { PermissionsModule } from '@innovatech/ui/permissions/data';
import { UserCheckboxFilterModule } from '@innovatech/ui/users/ui';
import { VehiclesDataModule } from '@innovatech/ui/vehicles/data';
import { VehicleFormModule } from '@innovatech/ui/vehicles/ui';
import { EntityDataService } from '@ngrx/data';
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
import { RevisionRequestDataService } from './services/revision-request-data.service';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RevisionRequestsRoutingModule,
    ApsSearchbarModule,
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
    ApsEmptyModule,
    NzTagModule,
    NzDropDownModule,
    NzToolTipModule,
    NzIconModule,
    ApsPhoneModule,
    ApsDateFilterModule,
    ApsCheckboxFilterModule,
    ApsRadioFilterModule,
    ApsFeatureLayoutModule,
    PermissionsModule,
    GroupCheckboxFilterModule,
    CompanyCheckboxFilterModule,
    UserCheckboxFilterModule,
  ],
  declarations: [
    RevisionRequestListContainerComponent,
    RevisionRequestFormContainerComponent,
    RevisionRequestFormComponent,
    RevisionRequestListComponent,
  ],
})
export class RevisionRequestsModule {
  constructor(entityDataService: EntityDataService, revisionRequestDataService: RevisionRequestDataService) {
    entityDataService.registerService('RevisionRequest', revisionRequestDataService);
  }
}
