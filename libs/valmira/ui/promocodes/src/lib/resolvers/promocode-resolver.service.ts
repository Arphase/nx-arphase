import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { Promocode } from '@valmira/domain';

import { PromocodeCollectionService } from '../services/promocode-collection.service';

@Injectable({ providedIn: 'root' })
export class PromocodeResolverService extends ApsEntityResolverService<Promocode> {
  constructor(protected promocodeCollectionService: PromocodeCollectionService) {
    super(promocodeCollectionService);
  }
}
