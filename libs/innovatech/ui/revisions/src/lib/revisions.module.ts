import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  ApsCheckboxFilterModule,
  ApsDateFilterModule,
  ApsEmptyModule,
  ApsFeatureLayoutModule,
  ApsRadioFilterModule,
  ApsSearchbarModule,
} from '@arphase/ui/core';
import { ApsAutoErrorModule } from '@arphase/ui/forms';
import { CompanyCheckboxFilterModule } from '@innovatech/ui/companies/ui';
import { IvtFolioModule } from '@innovatech/ui/core/ui';
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
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzTypographyModule } from 'ng-zorro-antd/typography';

import { RevisionFormComponent } from './components/revision-form/revision-form.component';
import { RevisionListComponent } from './components/revision-list/revision-list.component';
import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { EditableRevisionPipe } from './pipes/editable-revision.pipe';
import { RevisionsRoutingModule } from './revisions-routing.module';
import { RevisionDataService } from './services/revision-data.service';

@NgModule({
  imports: [
    ApsAutoErrorModule,
    ApsCheckboxFilterModule,
    ApsDateFilterModule,
    ApsEmptyModule,
    ApsFeatureLayoutModule,
    ApsRadioFilterModule,
    ApsSearchbarModule,
    CommonModule,
    CompanyCheckboxFilterModule,
    GroupCheckboxFilterModule,
    IvtFolioModule,
    NzAlertModule,
    NzButtonModule,
    NzCardModule,
    NzCollapseModule,
    NzDividerModule,
    NzDropDownModule,
    NzEmptyModule,
    NzFormModule,
    NzGridModule,
    NzIconModule,
    NzInputModule,
    NzMessageModule,
    NzPageHeaderModule,
    NzRadioModule,
    NzSelectModule,
    NzSpaceModule,
    NzTableModule,
    NzTagModule,
    NzToolTipModule,
    NzToolTipModule,
    NzTypographyModule,
    PermissionsModule,
    ReactiveFormsModule,
    RevisionsRoutingModule,
    UserCheckboxFilterModule,
    VehicleFormModule,
    VehiclesDataModule,
  ],
  declarations: [
    RevisionFormComponent,
    RevisionListComponent,
    RevisionListContainerComponent,
    RevisionFormContainerComponent,
    EditableRevisionPipe,
  ],
})
export class RevisionsModule {
  constructor(entityDataService: EntityDataService, revisionDataService: RevisionDataService) {
    entityDataService.registerService('Revision', revisionDataService);
  }
}
