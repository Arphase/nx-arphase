import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-group-row',
  templateUrl: './group-row.component.html',
  styleUrls: ['./group-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupRowComponent extends IvtRowComponent<Group> {}
