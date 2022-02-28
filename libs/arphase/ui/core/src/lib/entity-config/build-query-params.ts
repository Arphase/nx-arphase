import { HttpParams } from '@angular/common/http';
import { DEFAULT_PAGE_SIZE } from '@arphase/common';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';

dayjs.extend(customParseFormat);
dayjs.extend(LocalizedFormat);

export function buildQueryParams(queryParams): HttpParams {
  let params: Record<string, string | string[]> = {
    pageSize: String(DEFAULT_PAGE_SIZE),
    pageIndex: '1',
  };

  if (queryParams == null) {
    return new HttpParams({ fromObject: params });
  }

  if (queryParams.noDates) {
    const { startDate, endDate, noDates, dateType, ...filteredParams } = params;
    params = filteredParams;
  }

  Object.keys(queryParams)
    .filter(key => queryParams[key] != null && queryParams[key] !== '')
    .forEach(key => (params[key] = queryParams[key]));

  if (queryParams.dates && queryParams.dates.startDate && queryParams.dates.endDate) {
    params.startDate = queryParams.dates.startDate;
    params.endDate = queryParams.dates.endDate;

    if (queryParams.dates.dateType) {
      params.dateType = queryParams.dates.dateType;
    }
  }

  if (queryParams.sort) {
    const activeSort = (queryParams.sort as { key: string; value: 'ascend' | 'descend' }[]).find(sort => !!sort.value);
    if (activeSort) {
      const { key, value } = activeSort;
      params.sort = key;
      params.direction = value;
    } else {
      const { sort, ...filteredParams } = params;
      params = filteredParams;
    }
  }
  const { dates, noDates, filter, resetList, ...fromObject } = params;

  return new HttpParams({ fromObject });
}
