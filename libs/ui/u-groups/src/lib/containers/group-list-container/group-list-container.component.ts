import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@ivt/c-data';
import { GroupCollectionService, GroupDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-group-list-container',
  templateUrl: './group-list-container.component.html',
  styleUrls: ['./group-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupListContainerComponent extends IvtListContainerComponent<Group> {
  constructor(protected groupCollectionService: GroupCollectionService, protected groupDataService: GroupDataService) {
    super(groupCollectionService, groupDataService);
  }
}
