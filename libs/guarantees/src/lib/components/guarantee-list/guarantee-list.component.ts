import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
} from '@angular/core';
import { Guarantee } from '@ivt/data';
import { IvtColumns, IvtListComponent } from '@ivt/ui';

@Component({
  selector: 'ivt-guarantee-list',
  templateUrl: './guarantee-list.component.html',
  styleUrls: ['./guarantee-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuaranteeListComponent extends IvtListComponent<Guarantee> {
  columns: IvtColumns = [
    {
      label: 'Folio',
      prop: 'id',
      sortable: true,
      colSize: 3,
    },
    {
      label: 'Fecha inicio',
      prop: 'startDate',
      sortable: true,
      colSize: 3,
    },
    {
      label: 'Fecha fin',
      prop: 'endDate',
      sortable: true,
      colSize: 3,
    },
    {
      label: 'Acciones',
      prop: 'actions',
      sortable: false,
      colSize: 3,
      alignment: 'right',
    },
  ];
  @Output() downloadPdf = new EventEmitter<number>();
}
