import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsCollectionCheckboxFilterComponent } from '@arphase/ui/core';
import { Group } from '@innovatech/common/domain';
import { GroupCollectionService } from '@innovatech/ui/groups/data';

@Component({
  selector: 'ivt-group-checkbox-filter',
  templateUrl: './group-checkbox-filter.component.html',
  styleUrls: ['./group-checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class GroupCheckboxFilterComponent extends ApsCollectionCheckboxFilterComponent<Group> {
  sortValue = [{ key: 'group.name', value: 'ascend' }];
  filterPropertyName = 'groupIds';

  constructor(protected groupCollectionService: GroupCollectionService) {
    super(groupCollectionService);
  }
}
