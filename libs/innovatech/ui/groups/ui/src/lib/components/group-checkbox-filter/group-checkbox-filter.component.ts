import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Group } from '@innovatech/common/domain';
import { CollectionCheckboxFilter } from '@innovatech/ui/core/data';
import { GroupFilterCollectionService } from '@innovatech/ui/groups/data';

@Component({
  selector: 'ivt-group-checkbox-filter',
  templateUrl: './group-checkbox-filter.component.html',
  styleUrls: ['./group-checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupCheckboxFilterComponent extends CollectionCheckboxFilter<Group> {
  sortValue = [{ key: 'user.firstName', value: 'ascend' }];
  filterPropertyName = 'groupIds';

  constructor(protected groupFilterCollectionService: GroupFilterCollectionService) {
    super(groupFilterCollectionService);
  }
}
