import { SortDirection } from '@arphase/common';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

import { ApsCollectionFilterDto } from '../dto/collection-filter.dto';

interface filterCollectionQueryOptions {
  ignoreSort?: boolean;
  ignoreDates?: boolean;
  logicalOperator?: 'and' | 'or';
}

export function filterCollectionQuery(
  entityName: string,
  query: SelectQueryBuilder<BaseEntity>,
  filterDto: Partial<ApsCollectionFilterDto>,
  options: filterCollectionQueryOptions = { ignoreSort: false, ignoreDates: false, logicalOperator: 'and' }
): void {
  const { sort, direction, pageIndex, pageSize } = filterDto;
  const { ignoreSort } = options;

  filterCollectionDates(entityName, query, filterDto, options);

  if (sort && direction && !ignoreSort) {
    query.orderBy(`${sort}`, SortDirection[direction]);
  }

  if (pageSize && pageIndex) {
    query.take(pageSize).skip(pageSize * (pageIndex - 1));
  }
}

export function filterCollectionDates(
  entityName: string,
  query: SelectQueryBuilder<BaseEntity>,
  filterDto: Partial<ApsCollectionFilterDto>,
  options: filterCollectionQueryOptions = { ignoreDates: false, logicalOperator: 'and' }
): void {
  const { startDate, endDate, dateType } = filterDto;
  const { ignoreDates, logicalOperator } = options;
  if (startDate && endDate && !ignoreDates) {
    const date = `${entityName}.${dateType || 'createdAt'}`;
    const expression = `(${date} >= :startDate and ${date} <= :endDate)`;
    const params = { startDate, endDate };
    logicalOperator === 'and' ? query.andWhere(expression, params) : query.orWhere(expression, params);
  }
}
