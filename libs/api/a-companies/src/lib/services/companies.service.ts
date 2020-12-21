import { CompanyRepository } from '@ivt/a-state';
import { Company } from '@ivt/c-data';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompanyRepository) {}

  async getCompanies(): Promise<Company[]> {
    const query = this.companyRepository.createQueryBuilder();
    const companies = await query.getMany();
    return companies;
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
