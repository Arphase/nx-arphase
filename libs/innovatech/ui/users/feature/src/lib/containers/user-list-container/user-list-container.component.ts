import { ChangeDetectionStrategy, Component } from '@angular/core';
import { User } from '@innovatech/common/domain';
import { UserCollectionService, UserDataService } from '@innovatech/ui/users/data';
import { IvtListContainerComponent } from '@innovatech/ui/core/data';

@Component({
  selector: 'ivt-user-list-container',
  templateUrl: './user-list-container.component.html',
  styleUrls: ['./user-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListContainerComponent extends IvtListContainerComponent<User> {
  constructor(protected userCollectionService: UserCollectionService, protected userDataService: UserDataService) {
    super(userCollectionService, userDataService, null, null);
  }
}
