import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui';
import { Promocode } from '@valmira/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'vma-promocode-list',
  templateUrl: './promocode-list.component.html',
  styleUrls: ['./promocode-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PromocodeListComponent extends ApsListComponent<Promocode> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'promocode.name',
      colSizes: {
        xs: 16,
        md: 8,
        lg: 4,
      },
    },
    {
      label: 'Fecha inicio',
      prop: 'promocode.startDate',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Fecha fin',
      prop: 'promocode.endDate',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Fecha captura',
      prop: 'promocode.createdAt',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Cantidad',
      prop: 'promocode.amount',
      colSizes: { lg: 8 },
    },
  ];

  dateTypeOptions: NzSelectOptionInterface[] = [
    { label: 'Inicio', value: 'startDate' },
    { label: 'Fin', value: 'endDate' },
    { label: 'Captura', value: 'createdAt' },
  ];
}
