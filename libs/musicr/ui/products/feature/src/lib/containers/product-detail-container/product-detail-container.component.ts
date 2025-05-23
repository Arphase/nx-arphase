import { ChangeDetectionStrategy, Component, effect, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderProduct } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { filter } from 'rxjs';

import { TitleCasePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ProductDetailComponent } from '../../components/product-detail/product-detail.component';
import { ProductDetailService } from '../../services/product-detail.service';

@UntilDestroy()
@Component({
  selector: 'mrl-product-detail-container',
  templateUrl: './product-detail-container.component.html',
  styleUrls: ['./product-detail-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductDetailService, TitleCasePipe],
  imports: [ProductDetailComponent],
  standalone: true,
})
export class ProductDetailContainerComponent implements OnInit {
  private readonly title = inject(Title);
  private readonly titleCasePipe = inject(TitleCasePipe);
  private readonly productDetailService = inject(ProductDetailService);
  private readonly route = inject(ActivatedRoute);
  private readonly cartService = inject(CartService);

  loading = this.productDetailService.loading;
  product = this.productDetailService.product;
  priceOptions = this.productDetailService.priceOptions;
  additionalOptions = this.productDetailService.additionalOptions;

  constructor() {
    effect(() => {
      if (this.product()?.name) {
        this.title.setTitle(`Music Revolution - ${this.titleCasePipe.transform(this.product().name)}`);
      }
    });
  }

  ngOnInit() {
    this.route.params
      .pipe(
        filter(params => !!params),
        untilDestroyed(this),
      )
      .subscribe(({ id }) => this.productDetailService.getProduct(id));
  }

  addItem(item: Partial<OrderProduct>): void {
    this.cartService.addItem(item);
  }
}
