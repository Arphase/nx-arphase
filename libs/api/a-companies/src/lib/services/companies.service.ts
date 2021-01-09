import { CompanyRepository } from '@ivt/a-state';
import { Company, User, UserRoles } from '@ivt/c-data';
import { convertStringToNumberArray } from '@ivt/c-utils';
import { Injectable, NotFoundException } from '@nestjs/common';

import { FilterCompaniesDto } from '../dto/filter-companies.dto';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompanyRepository) {}

  async getCompanies(filterDto: FilterCompaniesDto, user: Partial<User>): Promise<Company[]> {
    const query = this.companyRepository.createQueryBuilder('company');
    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(company.id = :id)', { id: user.companyId });
    }

    if (filterDto?.groupIds) {
      query.andWhere('(company.groupId IN (:...ids))', { ids: convertStringToNumberArray(filterDto.groupIds) });
    }

    return await query.getMany();
  }

  async getCompany(id: number): Promise<Company> {
    const query = this.companyRepository.createQueryBuilder('company');
    const found = await query.where('company.id = :id', { id }).getOne();

    if (!found) {
      throw new NotFoundException(`Company with id "${id}" not found`);
    }

    return found;
  }
}
