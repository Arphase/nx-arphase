import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IvtUiModule } from '@ivt/u-ui';

import { RevisionFormComponent } from './components/revision-form/revision-form.component';
import { RevisionListComponent } from './components/revision-list/revision-list.component';
import { RevisionRowComponent } from './components/revision-row/revision-row.component';
import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { RevisionsRoutingModule } from './revisions-routing.module';

@NgModule({
  imports: [CommonModule, RevisionsRoutingModule, IvtUiModule],
  declarations: [
    RevisionFormComponent,
    RevisionListComponent,
    RevisionRowComponent,
    RevisionListContainerComponent,
    RevisionFormContainerComponent,
  ],
})
export class RevisionsModule {}
