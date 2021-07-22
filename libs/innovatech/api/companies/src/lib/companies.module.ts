import { AuthDataModule } from '@innovatech/api/auth/data';
import { CompanyEntity } from '@innovatech/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CompaniesController } from './controllers/companies.controller';
import { CompaniesService } from './services/companies.service';

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity]), AuthDataModule],
  controllers: [CompaniesController],
  providers: [CompaniesService],
})
export class CompaniesModule {}
