import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '@env/environment';
import { UserEntity } from '@api/users/data/user.entity';
import { GuaranteeEntity } from '@api/guarantees/data/entities/guarantee.entity';
import { ClientEntity } from '@api/guarantees/data/entities/client.entity';
import { MoralPersonEntity } from '@api/guarantees/data/entities/moral-person.entity';
import { PhysicalPersonEntity } from '@api/guarantees/data/entities/physical-person.entity';
import { VehicleEntity } from '@api/guarantees/data/entities/vechicle.entity';
import { AddressEntity } from '@api/guarantees/data/entities/address.entity';

const ENTITIES = [
  AddressEntity,
  UserEntity,
  GuaranteeEntity,
  ClientEntity,
  MoralPersonEntity,
  PhysicalPersonEntity,
  VehicleEntity
];

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: environment.databaseConfig.type,
  host: process.env.RDS_HOSTNAME || environment.databaseConfig.host,
  port: Number(process.env.RDS_PORT) || environment.databaseConfig.port,
  database: process.env.RDS_DB_NAME || environment.databaseConfig.database,
  entities: ENTITIES,
  synchronize:
    Boolean(process.env.TYPEORM_SYNC) || environment.databaseConfig.synchronize,
};
