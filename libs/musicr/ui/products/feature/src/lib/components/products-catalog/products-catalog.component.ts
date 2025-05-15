import { CurrencyPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Product } from '@musicr/domain';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  imports: [NzGridModule, NzSkeletonModule, CurrencyPipe, RouterLink, NzToolTipModule],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent {
  products = input<Product[]>();
  title = input<string>();
  loading = input<boolean>();
  mockArray = new Array(8).fill(null).map((_, index) => ({
    id: index,
  }));
}
