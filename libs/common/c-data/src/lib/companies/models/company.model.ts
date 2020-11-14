import { Address } from '../../address/model/address.model';
import { Group } from '../../groups/models/group.model';
import { User } from '../../users/models/user.model';

export interface Company {
  id?: number;
  businessName: string;
  rfc: string;
  contact: string;
  email: string;
  phone: string;
  address: Address;
  group: Group;
  users: User[];
}

