import { GuaranteeSummary } from '@innovatech/common/domain';
import { QueryParams } from '@ngrx/data';

export interface DashboardState {
  guaranteeSummary: GuaranteeSummary;
  queryParams: QueryParams;
}
