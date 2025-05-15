import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { AdditionalProduct } from '@valmira/domain';

@Component({
    selector: 'vma-additional-product-list',
    templateUrl: './additional-product-list.component.html',
    styleUrls: ['./additional-product-list.component.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class AdditionalProductListComponent extends ApsListComponent<AdditionalProduct> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'additionalProduct.name',
      colSizes: {
        xs: 24,
        md: 6,
        lg: 6,
      },
    },
    {
      label: 'Precio',
      prop: 'additionalProduct.price',
      colSizes: {
        md: 4,
        lg: 4,
      },
    },
    {
      label: 'Descripción',
      prop: 'additionalProduct.descripton',
      colSizes: {
        md: 6,
        lg: 6,
      },
    },
    {
      label: 'Fecha creación',
      prop: 'additionalProduct.createdAt',
      colSizes: {
        md: 8,
        lg: 8,
      },
    },
  ];
}
