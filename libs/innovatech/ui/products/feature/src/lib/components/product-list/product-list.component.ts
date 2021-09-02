import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Product } from '@innovatech/common/domain';

@Component({
  selector: 'ivt-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent extends ApsListComponent<Product> {
  columns: ApsColumns = [
    {
      label: 'Folio',
      prop: 'product.id',
      colSizes: {
        xs: 0,
        md: 4,
      },
    },
    {
      label: 'Nombre',
      prop: 'product.name',
      colSizes: {
        xs: 10,
        md: 6,
      },
    },
    {
      label: 'Precio',
      prop: 'product.price',
      colSizes: {
        xs: 0,
        md: 6,
      },
    },
    {
      label: 'Logo',
      prop: 'product.logo',
      colSizes: {
        xs: 14,
        md: 8,
      },
    },
  ];
}
