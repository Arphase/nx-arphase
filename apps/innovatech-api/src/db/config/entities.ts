import { AddressEntity } from '@api/guarantees/data/entities/address.entity';
import { ClientEntity } from '@api/guarantees/data/entities/client.entity';
import { GuaranteeEntity } from '@api/guarantees/data/entities/guarantee.entity';
import { LocalityEntity } from '@api/localities/data/locality.entity';
import { MoralPersonEntity } from '@api/guarantees/data/entities/moral-person.entity';
import { PhysicalPersonEntity } from '@api/guarantees/data/entities/physical-person.entity';
import { VehicleEntity } from '@api/guarantees/data/entities/vechicle.entity';
import { UserEntity } from '@api/users/data/user.entity';
import { PaymentOrderEntity } from '@api/payment-orders/data/payment-order.entity';

export const ENTITIES = [
  AddressEntity,
  LocalityEntity,
  UserEntity,
  GuaranteeEntity,
  PaymentOrderEntity,
  ClientEntity,
  MoralPersonEntity,
  PhysicalPersonEntity,
  VehicleEntity,
];
