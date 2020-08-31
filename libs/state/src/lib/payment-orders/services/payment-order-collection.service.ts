import { Injectable } from '@angular/core';
import { PaymentOrder } from '@ivt/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

import { IvtCollectionService } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderCollectionService extends IvtCollectionService<PaymentOrder> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PaymentOrder', serviceElementsFactory);
  }
}
