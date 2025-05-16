import { filterCollectionQuery } from '@arphase/api/core';
import { hasAccessToAllData, User, UserRoles } from '@innovatech/common/domain';
import { BaseEntity, SelectQueryBuilder } from 'typeorm';

import { CommonFilterDto } from '../dto';

export function filterCommonQuery(
  entityName: string,
  query: SelectQueryBuilder<BaseEntity>,
  filterDto: Partial<CommonFilterDto>,
  user?: Partial<User>,
  options?: Partial<{ companyidEntityName: string }>,
): void {
  const { groupIds, companyIds, userIds } = filterDto;

  if (user && !hasAccessToAllData(user.role as UserRoles)) {
    query.andWhere(`(${options?.companyidEntityName || entityName}.companyId = :id)`, { id: user.companyId });
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

  filterCollectionQuery(entityName, query, filterDto);
}
