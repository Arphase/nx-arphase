import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Revision, RevisionStatus, UserRoles } from '@ivt/c-data';
import { REQUIRED_ROLES } from '@ivt/u-state';
import { IvtListComponent } from '@ivt/u-ui';
import dayjs from 'dayjs';

import { revisionStatusLabels, statusOptions } from '../revision-form/revision-form.constants';
import { colorMaps, columns, iconMaps } from './revision-list.constants';

@Component({
  selector: 'ivt-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin] }],
})
export class RevisionListComponent extends IvtListComponent<Revision> {
  @Input() canCreateRevision: boolean;
  columns = columns;
  statusLabels = revisionStatusLabels;
  revisionStatus = RevisionStatus;
  colorMaps = colorMaps;
  iconMaps = iconMaps;
  statusOptions = statusOptions;

  isEditable(revision: Revision): boolean {
    return dayjs(revision.createdAt).isAfter(dayjs().subtract(3, 'months'));
  }

  updateStatusFilter(status: RevisionStatus): void {
    this.filterItems.emit({ status });
  }
}
