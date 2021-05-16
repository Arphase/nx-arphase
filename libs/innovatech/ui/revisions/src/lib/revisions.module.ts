import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ApsAutoErrorModule } from '@arphase/ui';
import { VehiclesDataModule } from '@innovatech/ui/vehicles/data';
import { VehicleFormModule } from '@innovatech/ui/vehicles/ui';
import { PermissionsModule } from '@ivt/u-state';
import {
  IvtCheckboxFilterModule,
  IvtDateFilterModule,
  IvtEmptyModule,
  IvtRadioFilterModule,
  IvtSearchbarModule,
} from '@ivt/u-ui';
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
import { RevisionsRoutingModule } from './revisions-routing.module';
import { RevisionsComponent } from './revisions.component';
import { RevisionDataService } from './services/revision-data.service';

@NgModule({
  imports: [
    CommonModule,
    RevisionsRoutingModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzEmptyModule,
    IvtEmptyModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    NzToolTipModule,
    NzGridModule,
    NzMessageModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ApsAutoErrorModule,
    NzTypographyModule,
    NzToolTipModule,
    NzTableModule,
    NzDividerModule,
    IvtSearchbarModule,
    NzSpaceModule,
    NzTagModule,
    VehicleFormModule,
    NzCollapseModule,
    NzAlertModule,
    VehiclesDataModule,
    IvtDateFilterModule,
    IvtCheckboxFilterModule,
    IvtRadioFilterModule,
    PermissionsModule,
    NzRadioModule,
  ],
  declarations: [
    RevisionFormComponent,
    RevisionListComponent,
    RevisionListContainerComponent,
    RevisionFormContainerComponent,
    RevisionsComponent,
  ],
})
export class RevisionsModule {
  constructor(entityDataService: EntityDataService, revisionDataService: RevisionDataService) {
    entityDataService.registerService('Revision', revisionDataService);
  }
}
