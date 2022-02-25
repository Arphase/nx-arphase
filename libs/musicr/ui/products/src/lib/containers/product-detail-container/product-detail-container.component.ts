import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNil } from '@arphase/ui/core';
import { OrderProduct } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ProductDetailService } from '../../services/product-detail.service';

@UntilDestroy()
@Component({
  selector: 'mrl-product-detail-container',
  templateUrl: './product-detail-container.component.html',
  styleUrls: ['./product-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailService],
})
export class ProductDetailContainerComponent implements OnInit {
  loading$ = this.productDetailService.loading$;
  product$ = this.productDetailService.product$;
  priceOptions$ = this.productDetailService.priceOptions$;
  additionalOptions$ = this.productDetailService.additionalOptions$;

  constructor(
    private productDetailService: ProductDetailService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(untilDestroyed(this), filterNil())
      .subscribe(({ id }) => this.productDetailService.getProduct(id));
  }

  addItem(item: Partial<OrderProduct>): void {
    this.cartService.addItem(item);
  }
}
