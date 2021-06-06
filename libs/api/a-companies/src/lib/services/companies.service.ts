import { CompanyRepository } from '@innovatech/api/domain';
import { Company, createCollectionResponse, IvtCollectionResponse, User } from '@innovatech/common/domain';
import { CommonFilterDto, filterCommonQuery } from '@ivt/a-state';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(@InjectRepository(CompanyRepository) private companyRepository: CompanyRepository) {}

  async getCompanies(filterDto: CommonFilterDto, user: Partial<User>): Promise<IvtCollectionResponse<Company>> {
    const { pageSize, pageIndex, text } = filterDto;
    const query = this.companyRepository.createQueryBuilder('company');

    if (text) {
      query.andWhere(`LOWER(company.businessName) like :text`, { text: `%${text.toLowerCase()}%` });
    }

    filterCommonQuery('company', query, filterDto, user);

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
