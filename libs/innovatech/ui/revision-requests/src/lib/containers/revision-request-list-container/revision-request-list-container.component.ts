import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsListContainerComponent } from '@arphase/ui/core';
import { RevisionRequest, RevisionRequestStatus, UserRoles } from '@innovatech/common/domain';
import { PermissionService } from '@innovatech/ui/permissions/data';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs/operators';

import { statusLabels } from '../../components/revision-request-list/revision-request-list.constants';
import { RevisionRequestCollectionService } from '../../services/revision-request-collection.service';
import { RevisionRequestDataService } from '../../services/revision-request-data.service';

@Component({
  selector: 'ivt-revision-request-list-container',
  templateUrl: './revision-request-list-container.component.html',
  styleUrls: ['./revision-request-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListContainerComponent extends ApsListContainerComponent<RevisionRequest> {
  showUsersFilter$ = this.permissionService.hasReadPermission([UserRoles.superAdmin]);
  constructor(
    protected revisionRequestCollecitonService: RevisionRequestCollectionService,
    protected revisionRequestDataService: RevisionRequestDataService,
    protected messageService: NzMessageService,
    private permissionService: PermissionService
  ) {
    super(revisionRequestCollecitonService, revisionRequestDataService, null, messageService);
  }

  changeStatus(revisionRequest: Partial<RevisionRequest>): void {
    this.revisionRequestCollecitonService
      .update(revisionRequest)
      .pipe(take(1))
      .subscribe(() =>
        this.messageService.success(
          `La solicitud de revisión ahora está ${statusLabels[
            RevisionRequestStatus[revisionRequest.status]
          ].toLowerCase()}`
        )
      );
  }
}
