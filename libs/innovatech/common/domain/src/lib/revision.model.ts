import { Vehicle } from './vehicle.model';

export interface Revision {
  id?: number;
  report: RevisionReport;
  observations?: string;
  status: RevisionStatus | string;
  createdAt: Date;
  updatedAt: Date;
  vehicleId: number;
  vehicle: Vehicle;
  kilometrage?: number;
  reviewdBy?: string;
}

export enum RevisionStatus {
  elegible = 1,
  needsRepairs = 2,
  notElegible = 3,
}

export enum RevisionReportStatus {
  good = 1,
  normal = 2,
  bad = 3,
}

export enum RevisionReportItems {
  HighsLowsFog = 1,
  FrontRearSideQuarters = 2,
  DirectionalIntermittent = 3,
  BrakesReverse = 4,
  Interiors = 5,
  Refrigerant = 6,
  WipeWasher = 7,
  BrakesClutches = 8,
  TransmissionTransaxle = 9,
  HydraulicSteering = 10,
  CrystalsMirrors = 11,
  DoorsTrunkFender = 12,
  SeatsDashConsole = 13,
  BodyWorkWipeWasher = 14,
  Forwards = 15,
  Repair = 16,
  BallJointDustCover = 17,
  ShockAbsorbers = 18,
  SteeringBox = 19,
  TerminalBlocks = 20,
  FrontBrakePads = 21,
  RearBrakePads = 22,
  ExhaustPipe = 23,
  MotorMount = 24,
  Horn = 25,
}

export type RevisionReport = Record<RevisionReportItems, RevisionReportStatus>;
