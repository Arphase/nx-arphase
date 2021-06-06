import { Injectable } from '@angular/core';
import { PaymentOrder } from '@innovatech/common/domain';
import { IvtCollectionService } from '@innovatech/ui/core/data';
import { EntityCollectionServiceElementsFactory } from '@ngrx/data';

@Injectable({
  providedIn: 'root',
})
export class PaymentOrderCollectionService extends IvtCollectionService<PaymentOrder> {
  constructor(protected serviceElementsFactory: EntityCollectionServiceElementsFactory) {
    super('PaymentOrder', serviceElementsFactory);
  }
}
