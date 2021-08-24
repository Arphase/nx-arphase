import { Component, ChangeDetectionStrategy, Input, SimpleChanges, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@musicr/domain';

@Component({
  selector: 'mrl-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuComponent implements OnChanges {
  @Input() categories: Category[];
  visible = false;
  openMap = {};

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes.categories && this.categories) {
      this.categories.forEach(category => {
        this.openMap[category.id] = false;
      });
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

  goToCatalog(catalogId: number, isSubCategory: boolean) {
    isSubCategory
      ? this.router.navigateByUrl(`/products-catalog/subcategory/${catalogId}`)
      : this.router.navigateByUrl(`/products-catalog/category/${catalogId}`);
      this.closeMenu();
  }
}
