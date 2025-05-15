import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { User } from '@innovatech/common/domain';
import { UserCollectionService, UserDataService } from '@innovatech/ui/users/data';

@Component({
    selector: 'ivt-user-list-container',
    templateUrl: './user-list-container.component.html',
    styleUrls: ['./user-list-container.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class UserListContainerComponent extends ApsListContainerComponent<User> {
  constructor(protected userCollectionService: UserCollectionService, protected userDataService: UserDataService) {
    super(userCollectionService, userDataService, null, null);
  }
}
