import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest, RevisionRequestStatus, UserRoles } from '@innovatech/common/domain';
import { REQUIRED_ROLES } from '@ivt/u-state';
import { IvtListComponent } from '@ivt/u-ui';

import { colorMaps, columns, iconMaps, statusLabels, statusOptions } from './revision-request-list.constants';

@Component({
  selector: 'ivt-revision-request-list',
  templateUrl: './revision-request-list.component.html',
  styleUrls: ['./revision-request-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [{ provide: REQUIRED_ROLES, useValue: [UserRoles.superAdmin, UserRoles.repairman] }],
})
export class RevisionRequestListComponent extends IvtListComponent<RevisionRequest> {
  statusLabels = statusLabels;
  iconMaps = iconMaps;
  colorMaps = colorMaps;
  columns = columns;
  revisionRequestStatus = RevisionRequestStatus;
  statusOptions = statusOptions;

  onChangeStatus(id: number, status: RevisionRequestStatus): void {
    this.edit.emit({ id, status: status });
  }

  updateStatusFilter(status: RevisionRequestStatus): void {
    this.filterItems.emit({ status });
  }
}