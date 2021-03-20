import { Vehicle } from '../../vehicles';
import { RevisionStatus } from '../enums/revision-status.enum';
import { RevisionReport } from '../types/revision-report';

export interface Revision {
  id?: number;
  report: RevisionReport;
  observations?: string;
  status: RevisionStatus | string;
  createdAt: Date;
  updatedAt: Date;
  vehicleId: number;
  vehicle: Vehicle;
  reviewdBy?: string;
}
