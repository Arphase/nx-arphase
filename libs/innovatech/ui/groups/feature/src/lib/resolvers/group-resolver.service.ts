import { Injectable } from '@angular/core';
import { ApsEntityResolverService } from '@arphase/ui';
import { Group } from '@innovatech/common/domain';
import { GroupCollectionService } from '@innovatech/ui/groups/data';

@Injectable({ providedIn: 'root' })
export class GroupResolverService extends ApsEntityResolverService<Group> {
  constructor(protected groupCollectionService: GroupCollectionService) {
    super(groupCollectionService);
  }
}
