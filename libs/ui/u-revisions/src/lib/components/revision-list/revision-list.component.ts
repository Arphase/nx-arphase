import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Revision, RevisionStatus } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';
import dayjs from 'dayjs';

import { revisionStatusLabels } from '../revision-form/revision-form.constants';
import { colorMaps, columns, iconMaps } from './revision-list.constants';

@Component({
  selector: 'ivt-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListComponent extends IvtListComponent<Revision> {
  @Input() title: string;
  columns = columns;
  statusLabels = revisionStatusLabels;
  revisionStatus = RevisionStatus;
  colorMaps = colorMaps;
  iconMaps = iconMaps;

  isEditable(revision: Revision): boolean {
    return dayjs(revision.createdAt).isAfter(dayjs().subtract(3, 'months'));
  }
}
