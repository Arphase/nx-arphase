import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Revision } from '@ivt/c-data';
import { IvtColumns, IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-revision-list',
  templateUrl: './revision-list.component.html',
  styleUrls: ['./revision-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RevisionListComponent extends IvtListComponent<Revision> {
  @Input() title: string;
  columns: IvtColumns = [];
}
