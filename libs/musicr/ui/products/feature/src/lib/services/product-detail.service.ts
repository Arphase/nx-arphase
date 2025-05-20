import { HttpClient } from '@angular/common/http';
import { computed, Injectable, signal } from '@angular/core';
import { Product } from '@musicr/domain';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductDetailService {
  loading = signal<boolean>(false);
  product = signal<Product>(null);
  priceOptions = computed(() =>
    (this.product()?.priceOptions ?? [])
      .sort((a, b) => a.price - b.price)
      .map(priceOption => ({ label: priceOption.name, value: priceOption.id })),
  );
  additionalOptions = computed(() => (this.product()?.additionalOptions ?? []).sort((a, b) => a.price - b.price));

  constructor(private http: HttpClient) {}

  async getProduct(id: number): Promise<void> {
    this.loading.set(true);
    const product = await firstValueFrom(this.http.get<Product>(`/mrlApi/products/${id}`));
    this.product.set(product);
    this.loading.set(false);
  }
}
