import { CompanyRepository } from '@ivt/a-state';
import { Company } from '@ivt/c-data';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CompaniesService {
  constructor(private companyRepository: CompanyRepository) {}

  async getCompanies(): Promise<Company[]> {
    const query = this.companyRepository.createQueryBuilder();
    const companies = await query.getMany();
    return companies;
  }
}
