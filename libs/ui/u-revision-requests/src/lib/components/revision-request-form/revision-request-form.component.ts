import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RevisionRequest } from '@ivt/c-data';
import { IvtFormComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-revision-request-form',
  templateUrl: './revision-request-form.component.html',
  styleUrls: ['./revision-request-form.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestFormComponent extends IvtFormComponent<RevisionRequest> {}
