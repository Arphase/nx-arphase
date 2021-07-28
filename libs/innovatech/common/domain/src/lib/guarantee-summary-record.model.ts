import { GuaranteeStatus } from './guarantee.model';

export interface GuaranteeSummaryRecord {
  status: GuaranteeStatus;
  amount: number;
}

export type GuaranteeSummary = GuaranteeSummaryRecord[];
