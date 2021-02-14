import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-revision-request-list',
  templateUrl: './revision-request-list.component.html',
  styleUrls: ['./revision-request-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestListComponent extends IvtListComponent<RevisionRequest> {}
