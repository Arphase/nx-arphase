import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Product } from '@ivt/c-data';
import { IvtColumns, IvtListComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent extends IvtListComponent<Product> {
  columns: IvtColumns = [
    {
      label: 'Folio',
      prop: 'product.id',
      sortable: true,
      colSizes: {
        xs: '1',
      },
    },
    {
      label: 'Nombre',
      prop: 'product.name',
      sortable: true,
      colSizes: {
        xs: '1',
      },
    },
    {
      label: 'Precio',
      prop: 'product.price',
      sortable: true,
      alignment: 'right',
      colSizes: {
        xs: '1',
        sm: '9',
        md: '9',
        lg: '9',
      },
    },
  ];
}
