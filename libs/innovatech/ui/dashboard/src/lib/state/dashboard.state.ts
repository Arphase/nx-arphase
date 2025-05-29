import { ApsQueryParams } from '@arphase/common';
import { GuaranteeSummary } from '@innovatech/common/domain';

export interface DashboardState {
  guaranteeSummary: GuaranteeSummary;
  queryParams: ApsQueryParams;
}
