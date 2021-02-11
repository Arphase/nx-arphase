import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApsAutoErrorModule } from '@arphase/ui';
import {
  IvtEmptyModule,
  IvtRowModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { RevisionFormComponent } from './components/revision-form/revision-form.component';
import { RevisionListComponent } from './components/revision-list/revision-list.component';
import { RevisionRowComponent } from './components/revision-row/revision-row.component';
import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { RevisionsRoutingModule } from './revisions-routing.module';
import { RevisionsComponent } from './revisions.component';

@NgModule({
  imports: [
    CommonModule,
    RevisionsRoutingModule,
    ReactiveFormsModule,
    NzPageHeaderModule,
    NzEmptyModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    IvtEmptyModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    MatTooltipModule,
    NzGridModule,
    NzMessageModule,
    NzDropDownModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ApsAutoErrorModule,
  ],
  declarations: [
    RevisionFormComponent,
    RevisionListComponent,
    RevisionRowComponent,
    RevisionListContainerComponent,
    RevisionFormContainerComponent,
    RevisionsComponent,
  ],
})
export class RevisionsModule {}
