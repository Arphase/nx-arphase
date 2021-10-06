import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { OrderProduct, Product } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

@Component({
  selector: 'mrl-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  @Input() product: Product;
  @Input() priceOptions: NzSelectOptionInterface[] = [];
  total: number;
  @Output() addItemToCart = new EventEmitter<Partial<OrderProduct>>();

  constructor(private location: Location) {}

  onBack(): void {
    this.location.back();
  }

  addItem(): void {
    const item: Partial<OrderProduct> = {
      product: this.product,
      amount: 1,
      productId: this.product.id,
    };
    this.addItemToCart.emit(item);
  }
}
