import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui';
import { Revision } from '@innovatech/common/domain';

import { RevisionCollectionService } from '../services/revision-collection.service';

@Injectable({ providedIn: 'root' })
export class RevisionResolverService extends ApsEntityResolverService<Revision> {
  constructor(protected revisionCollectionService: RevisionCollectionService) {
    super(revisionCollectionService);
  }
}
