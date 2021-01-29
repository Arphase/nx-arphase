import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Revision, RevisionStatus } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

import { revisionStatusLabels } from '../revision-form/revision-form.constants';

@Component({
  selector: 'ivt-revision-row',
  templateUrl: './revision-row.component.html',
  styleUrls: ['./revision-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRowComponent extends IvtRowComponent<Revision> {
  statusLabels = revisionStatusLabels;
  revisionStatus = RevisionStatus;
  backgroundClasses: Record<string, string> = {
    [RevisionStatus[RevisionStatus.notElegible]]: 'bg-alert',
    [RevisionStatus[RevisionStatus.needsRepairs]]: 'bg-warning',
    [RevisionStatus[RevisionStatus.elegible]]: 'bg-success'
  };
}
