import { EntityRepository, Repository } from 'typeorm';

import { PaymentOrderEntity } from '../entities/payment-order.entity';

@EntityRepository(PaymentOrderEntity)
export class PaymentOrderRepository extends Repository<PaymentOrderEntity> {}
