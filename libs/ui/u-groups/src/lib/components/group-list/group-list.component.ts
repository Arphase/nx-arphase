import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Group } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

import { columns } from './group-list.constants';

@Component({
  selector: 'ivt-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListComponent extends IvtListComponent<Group> {
  columns = columns;

  constructor(public dialog: MatDialog) {
    super();
  }
}