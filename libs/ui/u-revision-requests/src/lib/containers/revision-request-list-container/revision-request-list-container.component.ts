import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest, RevisionStatus } from '@ivt/c-data';
import { IdentityFilterService, RevisionRequestCollectionService, RevisionRequestDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';
import { take } from 'rxjs/operators';

import { statusLabels } from '../../components/revision-request-list/revision-request-list.constants';

@Component({
  selector: 'ivt-revision-request-list-container',
  templateUrl: './revision-request-list-container.component.html',
  styleUrls: ['./revision-request-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListContainerComponent extends IvtListContainerComponent<RevisionRequest> {
  constructor(
    protected revisionRequestCollecitonService: RevisionRequestCollectionService,
    protected revisionRequestDataService: RevisionRequestDataService,
    protected messageService: NzMessageService,
    protected identityFilterService: IdentityFilterService
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
