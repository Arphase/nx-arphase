import { ChangeDetectionStrategy, Component } from '@angular/core';
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
      label: 'Placa',
      prop: 'ivt',
      sortable: true,
      colSize: 3,
    },
    {
      label: 'Acciones',
      prop: 'actions',
      sortable: false,
      colSize: 2,
      alignment: 'right',
    },
  ];
}
