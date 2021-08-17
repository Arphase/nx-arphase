import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '@musicr/domain';

@Component({
  selector: 'mrl-products-catalog',
  templateUrl: './products-catalog.component.html',
  styleUrls: ['./products-catalog.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsCatalogComponent {
  @Input() products: Product[];
  @Input() title: string;

  constructor(private router: Router) {}

  goToDetail(id: number) {
    this.router.navigateByUrl(`products-catalog/product/${id}`);
  }
}
