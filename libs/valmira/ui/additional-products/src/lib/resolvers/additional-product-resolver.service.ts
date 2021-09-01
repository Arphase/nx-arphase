import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui';
import { AdditionalProduct } from '@valmira/domain';

import { AdditionalProductCollectionService } from '../services/additional-product-collection.service';

@Injectable({
  providedIn: 'root',
})
export class AdditionalProductResolverService extends ApsEntityResolverService<AdditionalProduct> {
  constructor(protected additionalProductCollectionService: AdditionalProductCollectionService) {
    super(additionalProductCollectionService);
  }
}
