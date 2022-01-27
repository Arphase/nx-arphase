import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { AdditionalProduct } from '@valmira/domain';
import { AdditionalProductCollectionService } from '@valmira/ui/additional-products/data';

@Injectable({ providedIn: 'root' })
export class AdditionalProductResolverService extends ApsEntityResolverService<AdditionalProduct> {
  constructor(protected additionalProductCollectionService: AdditionalProductCollectionService) {
    super(additionalProductCollectionService);
  }
}
