import { EntityRepository, Repository } from 'typeorm';

import { RevisionEntity } from '../entities/revision.entity';

@EntityRepository(RevisionEntity)
export class RevisionRepository extends Repository<RevisionEntity> {}
