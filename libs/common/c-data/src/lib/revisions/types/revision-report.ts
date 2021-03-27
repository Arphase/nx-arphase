import { RevisionReportItems } from '../enums/revision-report-items.enum';
import { RevisionReportStatus } from '../enums/revision-report-status.enum';

export type RevisionReport = Record<RevisionReportItems, RevisionReportStatus>;
