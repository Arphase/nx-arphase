import { User, UserRoles } from '@ivt/c-data';
import { sortDirection } from '@ivt/c-utils';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

import { CommonFilterDto } from '../dto';

export function filterCommonQuery(
  entityName: string,
  query: SelectQueryBuilder<BaseEntity>,
  filterDto: Partial<CommonFilterDto>,
  user?: Partial<User>
) {
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

  if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
    query.andWhere(`(${entityName}.companyId = :id)`, { id: user.companyId });
  }

  if (sort && direction) {
    query.orderBy(`${sort}`, sortDirection[direction]);
  }

  if (startDate && endDate) {
    query.andWhere(
      `${entityName}.${dateType || 'createdAt'}
      BETWEEN :begin
      AND :end`,
      { begin: startDate, end: endDate }
    );
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
