import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  IvtEmptyModule,
  IvtFormFieldModule,
  IvtInputModule,
  IvtRowModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';

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
    IvtFormFieldModule,
    IvtInputModule,
    MatSelectModule,
    NzEmptyModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    MatMenuModule,
    IvtEmptyModule,
    NzIconModule,
    NzButtonModule,
    NzCardModule,
    MatTooltipModule,
    NzGridModule,
    NzMessageModule,
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
