import { Vehicle } from '../../vehicles';
import { RevisionStatus } from '../enums/revision-status.enum';

export interface Revision {
  id?: number;
  observations?: string;
  status: RevisionStatus | string;
  createdAt: Date;
  updatedAt: Date;
  vehicleId: number;
  vehicle: Vehicle;
}
