import { ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mrl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnInit, OnChanges {
  @Input() categories: Category[];
  @Input() items: number;
  visible = false;
  cartVisible = false;
  openMap = {};
  innerWidth: number;

  constructor(private router: Router, private cartService: CartService) {}

  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categories && this.categories) {
      this.categories.forEach(category => (this.openMap[category.id] = false));
    }
  }

  openMenu(): void {
    this.visible = true;
  }

  closeMenu(): void {
    this.visible = false;
  }

  openHandler(value: string): void {
    Object.keys(this.openMap).forEach(key => {
      if (key !== value) {
        this.openMap[key] = false;
      }
    });
  }

  goToCatalog(catalogId: number, isSubCategory: boolean): void {
    isSubCategory
      ? this.router.navigateByUrl(`/products-catalog/subcategory/${catalogId}`)
      : this.router.navigateByUrl(`/products-catalog/category/${catalogId}`);
    this.closeMenu();
  }

  openCart(): void {
    this.router.navigate([{ outlets: { cart: 'cart' } }], { skipLocationChange: true });
    this.cartVisible = true;
  }

  closeCart(): void {
    this.router.navigate([{ outlets: { cart: null } }], { skipLocationChange: true });
    this.cartVisible = false;
  }
}
