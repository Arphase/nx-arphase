import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ApsCollectionResponseInfo } from '@arphase/common';
import { Product } from '@musicr/domain';

@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent {
  @Input() products: Product[];
  @Input() info: ApsCollectionResponseInfo;
  @Input() title: string;
  @Input() loading: boolean;
  mockArray = new Array(8);
}
