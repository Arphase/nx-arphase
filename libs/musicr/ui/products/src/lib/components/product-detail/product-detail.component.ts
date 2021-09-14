import { Location } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Product } from '@musicr/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';
import { CartService } from '@musicr/ui/cart';
@Component({
  selector: 'mrl-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductDetailComponent {
  @Input() product: Product;
  @Input() priceOptions: NzSelectOptionInterface[] = [];
  amount = 1;
  total: number;

  constructor(private location: Location, private cartService: CartService) {}

  onBack(): void {
    this.location.back();
  }

  addItem(): void {
    const item = {
      ...this.product,
      amount: this.amount,
    };
    this.cartService.addItem(item);
  }
}
