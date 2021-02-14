import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest } from '@ivt/c-data';
import { RevisionRequestCollectionService, RevisionRequestDataService } from '@ivt/u-state';
import { IvtListContainerComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-revision-request-list-container',
  templateUrl: './revision-request-list-container.component.html',
  styleUrls: ['./revision-request-list-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListContainerComponent extends IvtListContainerComponent<RevisionRequest> {
  constructor(
    protected revisionRequestCollecitonService: RevisionRequestCollectionService,
    protected revisionRequestDataService: RevisionRequestDataService
  ) {
    super(revisionRequestCollecitonService, revisionRequestDataService);
  }
}
