import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { CollectionCheckboxFilter } from '@innovatech/ui/core/data';
import { UserFilterCollectionService } from '@innovatech/ui/users/data';

@Component({
  selector: 'ivt-user-checkbox-filter',
  templateUrl: './user-checkbox-filter.component.html',
  styleUrls: ['./user-checkbox-filter.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserCheckboxFilterComponent extends CollectionCheckboxFilter<User> {
  sortValue = [{ key: 'user.firstName', value: 'ascend' }];
  filterPropertyName = 'userIds';
  constructor(protected userFilterCollectionService: UserFilterCollectionService) {
    super(userFilterCollectionService);
  }
}
