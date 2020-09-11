import { EntityRepository, Repository } from 'typeorm';
import { LocalityEntity } from '@ivt/a-state';


@EntityRepository(LocalityEntity)
export class LocalityRepository extends Repository<LocalityEntity> {}
