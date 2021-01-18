import { EntityRepository, Repository } from 'typeorm';

import { VehicleEntity } from './vechicle.entity';

@EntityRepository(VehicleEntity)
export class VehicleRepository extends Repository<VehicleEntity> {}
