import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui/core';
import { RevisionRequest } from '@innovatech/common/domain';

import { RevisionRequestCollectionService } from '../services/revision-request-collection.service';

@Injectable({ providedIn: 'root' })
export class RevisionRequestResolverService extends ApsEntityResolverService<RevisionRequest> {
  constructor(protected revisionRequestCollectionService: RevisionRequestCollectionService) {
    super(revisionRequestCollectionService);
  }
}
