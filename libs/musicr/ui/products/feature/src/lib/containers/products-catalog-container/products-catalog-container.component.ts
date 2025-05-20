import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';

import { TitleCasePipe } from '@angular/common';
import { Title } from '@angular/platform-browser';
import { ProductsCatalogComponent } from '../../components/products-catalog/products-catalog.component';
import { ProductsCatalogService } from '../../services/products-catalog.service';

@Component({
  selector: 'mrl-products-catalog-container',
  templateUrl: './products-catalog-container.component.html',
  styleUrls: ['./products-catalog-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ProductsCatalogComponent],
  providers: [ProductsCatalogService, TitleCasePipe],
  standalone: true,
})
export class ProductsCatalogContainerComponent {
  private readonly title = inject(Title);
  private readonly titleCasePipe = inject(TitleCasePipe);
  private readonly productsCatalogService = inject(ProductsCatalogService);

  products = this.productsCatalogService.products;
  pageTitle = this.productsCatalogService.title;
  loading = this.productsCatalogService.loading;
  loadingSort = this.productsCatalogService.loadingSort;

  constructor() {
    effect(() => {
      if (this.pageTitle()) {
        this.title.setTitle(`Music Revolution - ${this.titleCasePipe.transform(this.pageTitle())}`);
      }
    });
  }

  sort(sortOption: string): void {
    this.productsCatalogService.sort(sortOption);
  }
}
