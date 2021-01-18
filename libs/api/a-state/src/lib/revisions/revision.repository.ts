import { EntityRepository, Repository } from 'typeorm';

import { RevisionEntity } from './revision.entity';

@EntityRepository(RevisionEntity)
export class RevicionRepository extends Repository<RevisionEntity> {}
