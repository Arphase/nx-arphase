import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-revision-requests',
  templateUrl: './revision-requests.component.html',
  styleUrls: ['./revision-requests.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionRequestsComponent {}
