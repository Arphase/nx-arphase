import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-revisions',
  templateUrl: './revisions.component.html',
  styleUrls: ['./revisions.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionsComponent {}
