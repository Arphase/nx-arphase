import { HttpParams } from '@angular/common/http';
import { DEFAULT_LIMIT_SIZE, SortEvent } from '@ivt/c-data';
import { omit } from 'lodash-es';
import moment from 'moment';

export function buildQueryParams(queryParams): HttpParams {
  let params: Record<string, string | string[]> = {
    offset: '0',
    limit: String(DEFAULT_LIMIT_SIZE),
  };

  if (queryParams == null) {
    return new HttpParams({ fromObject: params });
  }

  if (queryParams.noDates) {
    params = omit(params, ['startDate', 'endDate', 'noDates', 'dateType']);
  }

  if (queryParams.noLimit) {
    params = omit(params, 'limit');
    params = omit(params, 'offset');
  }

  Object.keys(queryParams)
    .filter(key => queryParams[key] != null && queryParams[key] !== '')
    .forEach(key => (params[key] = queryParams[key]));

  if (queryParams.dates && queryParams.dates.startDate && queryParams.dates.endDate) {
    params.startDate = parseDate(queryParams.dates.startDate);
    params.endDate = parseDate(queryParams.dates.endDate);

    if (queryParams.dates.dateType) {
      params.dateType = queryParams.dates.dateType;
    }
  }

  if (queryParams.sort) {
    const { value, order } = queryParams.sort as SortEvent;
    params.sort = value;
    params.direction = order;
  }

  if (queryParams.resetList === String(true)) {
    params.offset = '0';
  }

  return new HttpParams({
    fromObject: omit(params, ['dates', 'resetList', 'noLimit', 'noDates']),
  });
}

function parseDate(date: string | Date): string {
  return moment(date, ['DD/MM/YY', moment.ISO_8601]).format('YYYY-MM-DD');
}
