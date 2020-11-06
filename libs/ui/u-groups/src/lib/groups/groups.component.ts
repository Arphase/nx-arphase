import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'ivt-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroupsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
