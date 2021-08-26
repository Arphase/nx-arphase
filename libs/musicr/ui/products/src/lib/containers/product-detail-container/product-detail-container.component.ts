import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductDetailService } from '../../services/product-detail.service';

@Component({
  selector: 'mrl-product-detail-container',
  templateUrl: './product-detail-container.component.html',
  styleUrls: ['./product-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailService],
})
export class ProductDetailContainerComponent {
  product$ = this.productDetailService.product$;
  priceOptions$ = this.productDetailService.priceOptions$;

  constructor(protected productDetailService: ProductDetailService) {}
}
