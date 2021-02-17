import { CompanyRepository, FilterCompaniesDto } from '@ivt/a-state';
import { Company, createCollectionResponse, IvtCollectionResponse, User, UserRoles } from '@ivt/c-data';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

  async getCompanies(filterDto: FilterCompaniesDto, user: Partial<User>): Promise<IvtCollectionResponse<Company>> {
    const { groupIds, pageSize, pageIndex } = filterDto;
    const query = this.companyRepository.createQueryBuilder('company');
    if (user && UserRoles[user.role] !== UserRoles.superAdmin) {
      query.andWhere('(company.id = :id)', { id: user.companyId });
    }

    if (groupIds) {
      query.andWhere('(company.groupId IN (:...ids))', { ids: groupIds });
    }

    const companies = await query.getMany();
    const total = await query.getCount();

    return createCollectionResponse(companies, pageSize, pageIndex, total);
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
