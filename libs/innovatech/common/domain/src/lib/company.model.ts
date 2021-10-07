import { Address } from '@arphase/common';

import { Group } from './group.model';
import { Guarantee } from './guarantee.model';
import { RevisionRequest } from './revision-request.model';
import { User } from './user.model';
import { Vehicle } from './vehicle.model';

export interface Company {
  id?: number;
  tempId?: number;
  businessName: string;
  rfc: string;
  contact: string;
  email: string;
  phone: string;
  address: Address;
  createdAt: Date;
  updatedAt: Date;
  group: Group;
  groupId: number;
  users: User[];
  guarantees: Guarantee[];
  vehicles: Vehicle[];
  revisionRequests: RevisionRequest[];
}
