import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Guarantee } from '@innovatech/common/domain';

import { GuaranteeCollectionService } from '../services/guarantee-collection.service';

@Injectable({ providedIn: 'root' })
export class GuaranteeResolverService extends ApsEntityResolverService<Guarantee> {
  constructor(protected guaranteCollectionService: GuaranteeCollectionService) {
    super(guaranteCollectionService);
  }
}
