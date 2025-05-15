import { ChangeDetectionStrategy, Component } from '@angular/core';

import { AsyncPipe } from '@angular/common';
import { ProductsCatalogComponent } from '../../components/products-catalog/products-catalog.component';
import { ProductsCatalogService } from '../../services/products-catalog.service';

@Component({
  selector: 'mrl-products-catalog-container',
  templateUrl: './products-catalog-container.component.html',
  styleUrls: ['./products-catalog-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [ProductsCatalogComponent, AsyncPipe],
  providers: [ProductsCatalogService],
})
export class ProductsCatalogContainerComponent {
  products$ = this.productsCatalogService.products$;
  title$ = this.productsCatalogService.title$;
  loading$ = this.productsCatalogService.loading$;

  constructor(protected productsCatalogService: ProductsCatalogService) {}
}
