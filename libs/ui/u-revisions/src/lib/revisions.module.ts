import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RevisionFormComponent } from './components/revision-form/revision-form.component';
import { RevisionListComponent } from './components/revision-list/revision-list.component';
import { RevisionRowComponent } from './components/revision-row/revision-row.component';
import { RevisionListContainerComponent } from './containers/revision-list-container/revision-list-container.component';
import { RevisionFormContainerComponent } from './containers/revision-form-container/revision-form-container.component';

@NgModule({
  imports: [CommonModule],
  declarations: [RevisionFormComponent, RevisionListComponent, RevisionRowComponent, RevisionListContainerComponent, RevisionFormContainerComponent],
})
export class RevisionsModule {}
