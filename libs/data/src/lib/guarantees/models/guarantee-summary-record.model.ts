import { GuaranteeStatus } from '../enums';

export interface GuaranteeSummaryRecord {
  status: GuaranteeStatus;
  amount: number;
}
