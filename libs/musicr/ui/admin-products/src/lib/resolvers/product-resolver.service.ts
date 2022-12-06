import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Product } from '@musicr/domain';
import { ProductCollectionService } from '@musicr/ui/products/data';

@Injectable({ providedIn: 'root' })
export class ProductResolverService extends ApsEntityResolverService<Product> {
  constructor(protected productCollectionService: ProductCollectionService) {
    super(productCollectionService);
  }
}
