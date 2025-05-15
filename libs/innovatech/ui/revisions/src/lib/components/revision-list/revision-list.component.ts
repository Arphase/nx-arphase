import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import { Revision, RevisionStatus, revisionStatusLabels, UserRoles } from '@innovatech/common/domain';

import { isRevisionEditable } from '../../pipes/editable-revision.pipe';
import { statusOptions } from '../revision-form/revision-form.constants';
import { colorMaps, columns, iconMaps } from './revision-list.constants';

@Component({
    selector: 'ivt-revision-list',
    templateUrl: './revision-list.component.html',
    styleUrls: ['./revision-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RevisionListComponent extends ApsListComponent<Revision> {
  @Input() canCreateRevision: boolean;
  columns = columns;
  statusLabels = revisionStatusLabels;
  revisionStatus = RevisionStatus;
  colorMaps = colorMaps;
  iconMaps = iconMaps;
  statusOptions = statusOptions;
  isRevisionEditable = isRevisionEditable;
  userRoles = UserRoles;
  @Output() createGuarantee = new EventEmitter<number>();

  updateStatusFilter(status: RevisionStatus): void {
    this.filterItems.emit({ status });
  }
}
