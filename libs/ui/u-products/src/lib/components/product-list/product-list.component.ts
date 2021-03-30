import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns } from '@arphase/ui';
import { Product } from '@ivt/c-data';
import { IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent extends IvtListComponent<Product> {
  columns: ApsColumns = [
    {
      label: 'Folio',
      prop: 'product.id',
      colSizes: {
        xs: 2,
      },
    },
    {
      label: 'Nombre',
      prop: 'product.name',
      colSizes: {
        xs: 2,
      },
    },
    {
      label: 'Precio',
      prop: 'product.price',
      colSizes: {
        xs: 2,
        sm: 18,
      },
    },
  ];
}
