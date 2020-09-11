import { EntityRepository, Repository } from 'typeorm';
import { PaymentOrderEntity } from '@ivt/a-state';

@EntityRepository(PaymentOrderEntity)
export class PaymentOrderRepository extends Repository<PaymentOrderEntity> {}
