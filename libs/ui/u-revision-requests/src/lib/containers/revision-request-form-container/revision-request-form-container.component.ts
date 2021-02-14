import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { RevisionRequest } from '@ivt/c-data';
import { RevisionRequestCollectionService } from '@ivt/u-state';
import { IvtFormContainerComponent } from '@ivt/u-ui';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'ivt-revision-request-form-container',
  templateUrl: './revision-request-form-container.component.html',
  styleUrls: ['./revision-request-form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestFormContainerComponent extends IvtFormContainerComponent<RevisionRequest> {
  constructor(
    protected revisionRequestCollectionService: RevisionRequestCollectionService,
    protected router: Router,
    protected messageService: NzMessageService
  ) {
    super(revisionRequestCollectionService, router, messageService);
  }
}
