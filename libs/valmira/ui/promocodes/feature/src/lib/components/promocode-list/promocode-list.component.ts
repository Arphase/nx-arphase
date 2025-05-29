import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Promocode } from '@valmira/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'vma-promocode-list',
  templateUrl: './promocode-list.component.html',
  styleUrls: ['./promocode-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PromocodeListComponent extends ApsListComponent<Promocode> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'promocode.name',
      colSizes: {
        xs: 24,
        md: 8,
        lg: 5,
      },
    },
    {
      label: 'Fecha inicio',
      prop: 'promocode.startDate',
      colSizes: {
        md: 5,
        lg: 4,
      },
    },
    {
      label: 'Fecha fin',
      prop: 'promocode.endDate',
      colSizes: {
        md: 5,
        lg: 4,
      },
    },
    {
      label: 'Fecha captura',
      prop: 'promocode.createdAt',
      colSizes: {
        lg: 4,
      },
    },
    {
      label: 'Cantidad',
      prop: 'promocode.amount',
      colSizes: {
        md: 6,
        lg: 7,
      },
    },
  ];

  dateTypeOptions: NzSelectOptionInterface[] = [
    { label: 'Inicio', value: 'startDate' },
    { label: 'Fin', value: 'endDate' },
    { label: 'Captura', value: 'createdAt' },
  ];
}
