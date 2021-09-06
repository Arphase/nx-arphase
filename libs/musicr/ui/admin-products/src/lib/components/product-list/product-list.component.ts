import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsColumns, ApsListComponent } from '@arphase/ui/core';
import { Product } from '@musicr/domain';

@Component({
  selector: 'mrl-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductListComponent extends ApsListComponent<Product> {
  columns: ApsColumns = [
    {
      label: 'Nombre',
      prop: 'product.name',
      colSizes: {
        xs: 24,
        md: 5,
        lg: 5,
      },
    },
    {
      label: 'Categoría',
      prop: 'category.name',
      colSizes: {
        md: 5,
        lg: 5,
      },
    },
    {
      label: 'Subategoría',
      prop: 'subcategory.name',
      colSizes: {
        md: 5,
        lg: 5,
      },
    },
    {
      label: 'Precio',
      prop: 'product.pruce',
      colSizes: {
        md: 9,
        lg: 9,
      },
    },
  ];
}
