import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { IdentityFilterService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';

import { UserCollectionService } from '../../services/user-collection.service';
import { UserDataService } from '../../services/user-data.service';

@Component({
  selector: 'ivt-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent extends IvtListContainerComponent<User> {
  constructor(
    protected userCollectionService: UserCollectionService,
    protected userDataService: UserDataService,
    protected identityFilterService: IdentityFilterService
  ) {
    super(userCollectionService, userDataService, null, null, identityFilterService);
  }
}
