import { Address } from '../../address/models/address.model';
import { RevisionRequestStatus } from '../enums/revision-request-status.enum';

export interface RevisionRequest {
  id?: number;
  address: Address;
  addressId: number;
  name: string;
  phone: string;
  email: string;
  status: RevisionRequestStatus | string;
}
