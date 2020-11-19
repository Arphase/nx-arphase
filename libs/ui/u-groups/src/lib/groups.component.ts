import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'ivt-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GroupsComponent {}
