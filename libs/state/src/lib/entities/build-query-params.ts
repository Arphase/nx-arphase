import { HttpParams } from '@angular/common/http';
import { DEFAULT_LIMIT_SIZE, IvtQueryParams, SortEvent } from '@ivt/data';
import { omit } from 'lodash';
import moment from 'moment';

export function buildQueryParams(queryParams: IvtQueryParams): HttpParams {
  // Default params
  let params = {
    offset: '0',
    limit: DEFAULT_LIMIT_SIZE,
  } as any;

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
    .filter((key) => queryParams[key] != null && queryParams[key] !== '')
    .forEach((key) => (params[key] = queryParams[key]));

  if (
    queryParams.dates &&
    queryParams.dates.startDate &&
    queryParams.dates.endDate
  ) {
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

  if (queryParams.resetList) {
    params.offset = '0';
  }

  return new HttpParams({
    fromObject: omit(params, [
      'sort',
      'dates',
      'resetList',
      'noLimit',
      'noDates',
    ]),
  });
}

function parseDate(date: string | Date): string {
  return moment(date, ['DD/MM/YYYY', moment.ISO_8601]).format('DD/MM/YYYY');
}
