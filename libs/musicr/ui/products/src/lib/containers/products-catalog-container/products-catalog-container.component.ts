import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ProductsCatalogService } from '../../services/products-catalog.service';

@Component({
  selector: 'mrl-products-catalog-container',
  templateUrl: './products-catalog-container.component.html',
  styleUrls: ['./products-catalog-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ProductsCatalogService],
})
export class ProductsCatalogContainerComponent implements OnInit {
  products$ = this.productsCatalogService.products$;
  title$ = this.productsCatalogService.title$;
  loading$ = this.productsCatalogService.loading$;

  constructor(protected productsCatalogService: ProductsCatalogService) {}

  ngOnInit(): void {
    this.productsCatalogService.listenToRouterEvents();
  }
}
