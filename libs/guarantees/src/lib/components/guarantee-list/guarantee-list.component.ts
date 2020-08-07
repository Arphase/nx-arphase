import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Guarantee } from '@ivt/data';
import { IvtListComponent } from '@ivt/ui';

import { columns, dateTypeOptions } from './guarantee-list.constants';

@Component({
  selector: 'ivt-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListComponent extends IvtListComponent<Guarantee> {
  columns = columns;
  dateTypeOptions = dateTypeOptions;
  @Output() downloadPdf = new EventEmitter<number>();
}
