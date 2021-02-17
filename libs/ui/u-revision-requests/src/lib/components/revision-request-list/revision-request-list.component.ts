import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { RevisionRequest, RevisionRequestStatus } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { colorMaps, columns, iconMaps, statusLabels, statusOptions } from './revision-request-list.constants';

@Component({
  selector: 'ivt-revision-request-list',
  templateUrl: './revision-request-list.component.html',
  styleUrls: ['./revision-request-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListComponent extends IvtListComponent<RevisionRequest> {
  @Input() showDetailOption: boolean;
  statusLabels = statusLabels;
  iconMaps = iconMaps;
  colorMaps = colorMaps;
  columns = columns;
  revisionRequestStatus = RevisionRequestStatus;
  statusOptions = statusOptions;

  onChangeStatus(id: number, status: RevisionRequestStatus): void {
    this.edit.emit({ id, status: status });
  }
}
