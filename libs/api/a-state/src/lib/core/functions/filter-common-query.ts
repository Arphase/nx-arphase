import { hasAccessToAllData, sortDirection, User } from '@innovatech/common/domain';
import dayjs from 'dayjs';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

import { CommonFilterDto } from '../dto';

export function filterCommonQuery(
  entityName: string,
  query: SelectQueryBuilder<BaseEntity>,
  filterDto: Partial<CommonFilterDto>,
  user?: Partial<User>,
  options?: Partial<{ companyidEntityName: string }>
): void {
  const {
    startDate,
    endDate,
    dateType,
    groupIds,
    companyIds,
    userIds,
    sort,
    direction,
    pageIndex,
    pageSize,
  } = filterDto;

  if (user && !hasAccessToAllData(user.role)) {
    query.andWhere(`(${options?.companyidEntityName || entityName}.companyId = :id)`, { id: user.companyId });
  }

  if (sort && direction) {
    query.orderBy(`${sort}`, sortDirection[direction]);
  }

  if (startDate && endDate) {
    const modifiedEndDate = dayjs(endDate, 'YYYY-MM-DD').add(1, 'day').format('YYYY-MM-DD');
    const date = `${entityName}.${dateType || 'createdAt'}`;
    query.andWhere(`${date} > :startDate and ${date} <= :endDate`, { startDate, endDate: modifiedEndDate });
  }

  if (groupIds) {
    query.innerJoin('company.group', 'group').andWhere('(group.id IN (:...groupIds))', { groupIds });
  }

  if (companyIds) {
    query.andWhere('(company.id IN (:...companyIds))', { companyIds });
  }

  if (userIds) {
    query.andWhere('(user.id IN (:...userIds))', { userIds });
  }

  if (pageSize && pageIndex) {
    query.take(pageSize).skip(pageSize * (pageIndex - 1));
  }
}
