import { RevisionStatus, Select } from '@ivt/c-data';

export const revisionStatusLabels: Record<RevisionStatus, string> = {
  [RevisionStatus.elegible]: 'En buenas condiciones',
  [RevisionStatus.needsRepairs]: 'Necesita reparaciones',
  [RevisionStatus.notElegible]: 'No apto para garantizar',
};

export const statusOptions: Select[] = [
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
