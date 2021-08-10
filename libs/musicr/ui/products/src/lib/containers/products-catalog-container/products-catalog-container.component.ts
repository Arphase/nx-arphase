import { Component, ChangeDetectionStrategy } from '@angular/core';
import { ProductsCatalogService } from '../../services/products-catalog.service';

@Component({
  selector: 'mrl-products-catalog-container',
  templateUrl: './products-catalog-container.component.html',
  styleUrls: ['./products-catalog-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers:[ProductsCatalogService]
})
export class ProductsCatalogContainerComponent {
  products$ = this.productsCatalogService.products$
  title$ = this.productsCatalogService.title$

  constructor(protected productsCatalogService: ProductsCatalogService) {}
}
