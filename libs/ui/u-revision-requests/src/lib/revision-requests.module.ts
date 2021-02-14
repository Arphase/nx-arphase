import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtSearchbarModule } from '@ivt/u-ui';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { RevisionRequestFormComponent } from './components/revision-request-form/revision-request-form.component';
import { RevisionRequestListComponent } from './components/revision-request-list/revision-request-list.component';
import { RevisionRequestFormContainerComponent } from './containers/revision-request-form-container/revision-request-form-container.component';
import { RevisionRequestListContainerComponent } from './containers/revision-request-list-container/revision-request-list-container.component';
import { RevisionRequestsRoutingModule } from './revision-requests-routing.module';
import { RevisionRequestsComponent } from './revision-requests.component';

@NgModule({
  imports: [
    CommonModule,
    RevisionRequestsRoutingModule,
    IvtSearchbarModule,
    NzGridModule,
    NzCardModule,
    NzButtonModule,
    NzDividerModule,
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
