import { SortDirection } from '@arphase/common';
import { endOfDay, startOfDay } from 'date-fns';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

import { ApsCollectionFilterDto } from '../dto';

export function filterCollectionQuery(
  entityName: string,
  query: SelectQueryBuilder<BaseEntity>,
  filterDto: Partial<ApsCollectionFilterDto>
): void {
  const { startDate, endDate, dateType, sort, direction, pageIndex, pageSize } = filterDto;

  if (sort && direction) {
    query.orderBy(`${sort}`, SortDirection[direction]);
  }

  if (startDate && endDate) {
    const date = `${entityName}.${dateType || 'createdAt'}`;
    query.andWhere(`${date} >= :startDate and ${date} <= :endDate`, {
      startDate: startOfDay(new Date(startDate)).toISOString(),
      endDate: endOfDay(new Date(endDate)).toISOString(),
    });
  }

  if (pageSize && pageIndex) {
    query.take(pageSize).skip(pageSize * (pageIndex - 1));
  }
}