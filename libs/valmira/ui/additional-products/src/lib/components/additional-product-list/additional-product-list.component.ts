import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui';
import { AdditionalProduct } from '@valmira/domain';

@Component({
  selector: 'vma-additional-product-list',
  templateUrl: './additional-product-list.component.html',
  styleUrls: ['./additional-product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdditionalProductListComponent extends ApsListComponent<AdditionalProduct> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'additionalProduct.name',
      colSizes: {
        xs: 16,
        md: 4,
        lg: 6,
      },
    },
    {
      label: 'Precio',
      prop: 'additionalProduct.price',
      colSizes: { lg: 4 },
    },
    {
      label: 'Descripción',
      prop: 'additionalProduct.descripton',
      colSizes: { lg: 6 },
    },
    {
      label: 'Fecha creación',
      prop: 'additionalProduct.createdAt',
      colSizes: { lg: 8 },
    },
  ];
}
