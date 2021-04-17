import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';
import { Group } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns } from './group-list.constants';

@Component({
  selector: 'ivt-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent extends IvtListComponent<Group> {
  columns = columns;
  @Output() assignProducts = new EventEmitter<Group>();
}
