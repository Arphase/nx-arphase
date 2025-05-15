import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { ApsListComponent } from '@arphase/ui/core';
import { Group } from '@innovatech/common/domain';

import { columns } from './group-list.constants';

@Component({
    selector: 'ivt-group-list',
    templateUrl: './group-list.component.html',
    styleUrls: ['./group-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class GroupListComponent extends ApsListComponent<Group> {
  columns = columns;
  @Output() assignProducts = new EventEmitter<Group>();
}
