import { GuaranteeSummary, IvtQueryParams } from '@innovatech/common/domain';

export interface DashboardState {
  guaranteeSummary: GuaranteeSummary;
  queryParams: IvtQueryParams;
}
