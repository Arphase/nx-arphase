import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui';
import { Promocode } from '@valmira/domain';

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
        lg: 6,
      },
    },
    {
      label: 'Fecha inicial',
      prop: 'promocode.startDate',
      colSizes: {
        md: 5,
        lg: 6,
      },
    },
    {
      label: 'Fecha final',
      prop: 'promocode.endDate',
      colSizes: {
        md: 4,
        lg: 6,
      },
    },
    {
      label: 'Cantidad',
      prop: 'promocode.amount',
      colSizes: { lg: 6 },
    },
  ];
}
