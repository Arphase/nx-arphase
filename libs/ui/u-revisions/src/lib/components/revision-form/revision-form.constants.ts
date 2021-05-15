import { RevisionReportItems, RevisionReportStatus, RevisionStatus } from '@innovatech/common/domain';
import { NzSelectOptionInterface } from 'ng-zorro-antd/select';

export const revisionStatusLabels: Record<RevisionStatus, string> = {
  [RevisionStatus.elegible]: 'En buenas condiciones',
  [RevisionStatus.needsRepairs]: 'Necesita reparaciones',
  [RevisionStatus.notElegible]: 'No garantizable',
};

export const statusOptions: NzSelectOptionInterface[] = [
  {
    label: revisionStatusLabels[RevisionStatus.elegible],
    value: RevisionStatus[RevisionStatus.elegible],
  },
  {
    label: revisionStatusLabels[RevisionStatus.needsRepairs],
    value: RevisionStatus[RevisionStatus.needsRepairs],
  },
  {
    label: revisionStatusLabels[RevisionStatus.notElegible],
    value: RevisionStatus[RevisionStatus.notElegible],
  },
];

export const reportLabels: Record<RevisionReportItems, string> = {
  [RevisionReportItems.HighsLowsFog]: 'Altas, bajas y niebla',
  [RevisionReportItems.FrontRearSideQuarters]: 'Cuartos delanteros, traseros y laterales',
  [RevisionReportItems.DirectionalIntermittent]: 'Direccionales e intermitentes',
  [RevisionReportItems.BrakesReverse]: 'Frenos y reversa',
  [RevisionReportItems.Interiors]: 'Interiores',
  [RevisionReportItems.Refrigerant]: 'Refrigerante',
  [RevisionReportItems.WipeWasher]: 'Limpia parabrisas',
  [RevisionReportItems.BrakesClutches]: 'Frenos y ambrague',
  [RevisionReportItems.TransmissionTransaxle]: 'Transmisión y transeje',
  [RevisionReportItems.HydraulicSteering]: 'Dirección hidráulica',
  [RevisionReportItems.CrystalsMirrors]: 'Cristales / espejos',
  [RevisionReportItems.DoorsTrunkFender]: 'Puertas / cofre / cajuela / salpicadera',
  [RevisionReportItems.SeatsDashConsole]: 'Asientos / tablero / consola',
  [RevisionReportItems.BodyWorkWipeWasher]: 'Limpia parabrisas',
  [RevisionReportItems.Forwards]: 'Delanteras (derecha-izquierda) / traseras (derecha-izquierda)',
  [RevisionReportItems.Repair]: 'Refacción',
  [RevisionReportItems.BallJointDustCover]: 'Rótula y guardapolvo',
  [RevisionReportItems.ShockAbsorbers]: 'Amortiguadores',
  [RevisionReportItems.SteeringBox]: 'Caja de dirección',
  [RevisionReportItems.TerminalBlocks]: 'Terminales de dirección',
  [RevisionReportItems.FrontBrakePads]: 'Discos / balatas delanteras',
  [RevisionReportItems.RearBrakePads]: 'Discos / balatas traseras (Incluye desmontar tambor',
  [RevisionReportItems.ExhaustPipe]: 'Tubería de escape',
  [RevisionReportItems.MotorMount]: 'Soporte de motor',
  [RevisionReportItems.Horn]: 'Claxon',
};

export type RevisionReportSections = Record<string, RevisionReportItems[]>;

export const revisionReportSections: RevisionReportSections = {
  '1) Luces': [
    RevisionReportItems.HighsLowsFog,
    RevisionReportItems.FrontRearSideQuarters,
    RevisionReportItems.DirectionalIntermittent,
    RevisionReportItems.BrakesReverse,
    RevisionReportItems.Interiors,
  ],
  '2) Fugas y Niveles': [
    RevisionReportItems.Refrigerant,
    RevisionReportItems.WipeWasher,
    RevisionReportItems.BrakesClutches,
    RevisionReportItems.TransmissionTransaxle,
    RevisionReportItems.HydraulicSteering,
  ],
  '3) Carrocería': [
    RevisionReportItems.CrystalsMirrors,
    RevisionReportItems.DoorsTrunkFender,
    RevisionReportItems.SeatsDashConsole,
    RevisionReportItems.BodyWorkWipeWasher,
  ],
  '4) Llantas (estado y presión)': [RevisionReportItems.Forwards, RevisionReportItems.Repair],
  '5) Suspensión y dirección': [
    RevisionReportItems.BallJointDustCover,
    RevisionReportItems.ShockAbsorbers,
    RevisionReportItems.SteeringBox,
    RevisionReportItems.TerminalBlocks,
  ],
  '6) Frenos': [RevisionReportItems.FrontBrakePads, RevisionReportItems.RearBrakePads],
  '7) Otros': [RevisionReportItems.ExhaustPipe, RevisionReportItems.MotorMount, RevisionReportItems.Horn],
};

export const iconMap: { color: string; type: string; value: RevisionReportStatus }[] = [
  { color: 'success', type: 'check-circle', value: RevisionReportStatus.good },
  { color: 'warning', type: 'exclamation-circle', value: RevisionReportStatus.normal },
  { color: 'error', type: 'close-circle', value: RevisionReportStatus.bad },
];
