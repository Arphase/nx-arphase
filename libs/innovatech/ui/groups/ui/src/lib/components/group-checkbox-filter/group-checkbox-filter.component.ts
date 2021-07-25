import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsCollectionCheckboxFilterComponent } from '@arphase/ui';
import { Group } from '@innovatech/common/domain';
import { GroupFilterCollectionService } from '@innovatech/ui/groups/data';

@Component({
  selector: 'ivt-group-checkbox-filter',
  templateUrl: './group-checkbox-filter.component.html',
  styleUrls: ['./group-checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCheckboxFilterComponent extends ApsCollectionCheckboxFilterComponent<Group> {
  sortValue = [{ key: 'group.name', value: 'ascend' }];
  filterPropertyName = 'groupIds';

  constructor(protected groupFilterCollectionService: GroupFilterCollectionService) {
    super(groupFilterCollectionService);
  }
}
