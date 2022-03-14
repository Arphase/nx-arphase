import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ApsCollectionResponse } from '@arphase/common';
import { Category } from '@musicr/domain';
import { CartService } from '@musicr/ui/cart/data';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'mrl-menu-container',
  templateUrl: './menu-container.component.html',
  styleUrls: ['./menu-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuContainerComponent {
  categories$ = this.getCategories().pipe(map(response => response.results));
  items$ = this.cartService.cartItems$.pipe(map(items => items?.length || 0));
  constructor(private http: HttpClient, private cartService: CartService) {}

  getCategories(): Observable<ApsCollectionResponse<Category>> {
    return this.http.get<ApsCollectionResponse<Category>>(`/mrlApi/categories`);
  }
}
