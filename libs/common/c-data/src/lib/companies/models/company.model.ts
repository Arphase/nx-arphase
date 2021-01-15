import { Address } from '../../address/model/address.model';
import { Group } from '../../groups/models/group.model';
import { Guarantee } from '../../guarantees/models/guarantee.model';
import { User } from '../../users/models/user.model';
import { Vehicle } from '../../vehicles/models/vehicle.model';

export interface Company {
  id?: number;
  tempId?: number;
  businessName: string;
  rfc: string;
  contact: string;
  email: string;
  phone: string;
  address: Address;
  group: Group;
  groupId: number;
  users: User[];
  guarantees: Guarantee[];
  vehicles: Vehicle[];
  createdAt: Date;
  updatedAt: Date;
}
