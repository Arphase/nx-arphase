import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  IvtEmptyModule,
  IvtEmptyStateModule,
  IvtFormFieldModule,
  IvtGoBackTitleModule,
  IvtInputModule,
  IvtRowModule,
  IvtTableModule,
  IvtTextTruncateTooltipModule,
  IvtVirtualScrollModule,
} from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzMessageModule } from 'ng-zorro-antd/message';

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
    IvtGoBackTitleModule,
    IvtFormFieldModule,
    IvtInputModule,
    MatSelectModule,
    IvtEmptyStateModule,
    IvtTableModule,
    IvtVirtualScrollModule,
    IvtRowModule,
    IvtTextTruncateTooltipModule,
    MatMenuModule,
    IvtEmptyModule,
    MatIconModule,
    NzButtonModule,
    MatCardModule,
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
