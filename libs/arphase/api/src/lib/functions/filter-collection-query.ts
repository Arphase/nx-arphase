import { SortDirection } from '@arphase/common';
import dayjs from 'dayjs';
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
    const modifiedEndDate = dayjs(endDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    const date = `${entityName}.${dateType || 'createdAt'}`;
    query.andWhere(`${date} > :startDate and ${date} <= :endDate`, { startDate, endDate: modifiedEndDate });
  }

  if (pageSize && pageIndex) {
    query.take(pageSize).skip(pageSize * (pageIndex - 1));
  }
}
