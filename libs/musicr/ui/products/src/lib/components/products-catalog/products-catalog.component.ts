import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Product } from '@musicr/domain';

@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent {
  @Input() products: Product[];
  @Input() title: string;
}
