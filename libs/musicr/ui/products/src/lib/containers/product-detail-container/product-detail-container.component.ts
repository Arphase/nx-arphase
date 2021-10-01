import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { filterNil } from '@arphase/ui/core';
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
  product$ = this.productDetailService.product$;
  priceOptions$ = this.productDetailService.priceOptions$;

  constructor(protected productDetailService: ProductDetailService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params
      .pipe(untilDestroyed(this), filterNil())
      .subscribe(({ id }) => this.productDetailService.getProduct(id));
  }
}
