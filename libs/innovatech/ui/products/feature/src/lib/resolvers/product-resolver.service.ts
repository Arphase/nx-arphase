import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Product } from '@innovatech/common/domain';
import { ProductCollectionService } from '@innovatech/ui/products/data';

@Injectable({ providedIn: 'root' })
export class ProductResolverService extends ApsEntityResolverService<Product> {
  constructor(protected productCollectionService: ProductCollectionService) {
    super(productCollectionService);
  }
}
