import { EntityRepository, Repository } from 'typeorm';

import { PaymentOrderEntity } from './payment-order.entity';

@EntityRepository(PaymentOrderEntity)
export class PaymentOrderRepository extends Repository<PaymentOrderEntity> {}
