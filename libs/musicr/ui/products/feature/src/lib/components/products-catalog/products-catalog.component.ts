import { CurrencyPipe, NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MapperPipe, MapperPipeFunction } from '@arphase/ui/core';
import { getProductCurrentPrice, Product } from '@musicr/domain';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSelectModule, NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  imports: [
    CurrencyPipe,
    FormsModule,
    MapperPipe,
    NgClass,
    NzGridModule,
    NzSelectModule,
    NzSkeletonModule,
    NzToolTipModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent {
  products = input<Product[]>();
  title = input<string>();
  loading = input<boolean>();
  loadingSort = input<boolean>();
  sort = output<NzSelectOptionInterface>();
  mockArray = new Array(8).fill(null).map((_, index) => ({
    id: index,
  }));
  priceMapper: MapperPipeFunction<Product, number> = (product: Product) => getProductCurrentPrice(product);
  sortingOption: NzSelectOptionInterface;
  sortOptions: NzSelectOptionInterface[] = [
    { label: 'Precio, menor a mayor', value: `product.price | ascend` },
    { label: 'Precio, mayor a menor', value: `product.price | descend` },
    { label: 'Popularidad, menor a mayor', value: `product.popularity | descend` },
    { label: 'Popularidad, mayor a mayor', value: `product.popularity | ascend` },
  ];
}
