import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@ivt/c-data';
import { IvtRowComponent } from '@ivt/u-ui';

@Component({
  selector: 'ivt-product-row',
  templateUrl: './product-row.component.html',
  styleUrls: ['./product-row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductRowComponent extends IvtRowComponent<Product> {
  @Input() loading: boolean;
}
