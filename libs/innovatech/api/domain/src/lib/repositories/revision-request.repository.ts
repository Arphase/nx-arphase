import { EntityRepository, Repository } from 'typeorm';

import { RevisionRequestEntity } from '../entities/revision-request.entity';

@EntityRepository(RevisionRequestEntity)
export class RevisionRequestRepository extends Repository<RevisionRequestEntity> {}
