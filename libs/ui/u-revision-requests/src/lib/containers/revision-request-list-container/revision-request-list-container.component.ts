import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest, RevisionStatus, UserRoles } from '@ivt/c-data';
import {
  getAuthUserRoleState,
  IdentityFilterService,
  IvtState,
  RevisionRequestCollectionService,
  RevisionRequestDataService,
} from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { select, Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { map, take } from 'rxjs/operators';

import { statusLabels } from '../../components/revision-request-list/revision-request-list.constants';

@Component({
  selector: 'ivt-revision-request-list-container',
  templateUrl: './revision-request-list-container.component.html',
  styleUrls: ['./revision-request-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListContainerComponent extends IvtListContainerComponent<RevisionRequest> {
  isSuperAdmin$ = this.store.pipe(
    select(getAuthUserRoleState),
    map(role => UserRoles[role] === UserRoles.superAdmin)
  );
  groupOptions$ = this.identityFilterService.groupOptions$;
  companyOptions$ = this.identityFilterService.companyOptions$;
  userOptions$ = this.identityFilterService.userOptions$;

  constructor(
    protected revisionRequestCollecitonService: RevisionRequestCollectionService,
    protected revisionRequestDataService: RevisionRequestDataService,
    protected messageService: NzMessageService,
    protected identityFilterService: IdentityFilterService,
    private store: Store<IvtState>
  ) {
    super(revisionRequestCollecitonService, revisionRequestDataService, null, messageService, identityFilterService);
  }

  changeStatus(revisionRequest: Partial<RevisionRequest>): void {
    this.revisionRequestCollecitonService
      .update(revisionRequest)
      .pipe(take(1))
      .subscribe(() =>
        this.messageService.success(
          `La solicitud de revisión ahora está ${statusLabels[
            RevisionStatus[RevisionStatus[revisionRequest.status]]
          ].toLowerCase()}`
        )
      );
  }
}
