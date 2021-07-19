import { AuthModule } from '@musicr/api/auth';
import { SubcategoryRepository } from '@musicr/api/domain';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubcategoriesController } from './controllers/subcategories.controller';
import { SubcategoriesService } from './services/subcategories.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([SubcategoryRepository])],
  controllers: [SubcategoriesController],
  providers: [SubcategoriesService],
})
export class SubcategoriesModule {}
