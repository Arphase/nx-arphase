import { Injectable } from '@angular/core';
import { ApsCollectionService } from '@arphase/ui/core';
import { PaymentOrder } from '@innovatech/common/domain';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({ providedIn: 'root' })
export class PaymentOrderCollectionService extends ApsCollectionService<PaymentOrder> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PaymentOrder', serviceElementsFactory);
  }
}
