import { AdditionalOptionsModule } from '@musicr/api/additional-options';
import { AuthModule } from '@musicr/api/auth';
import { CategoriesModule } from '@musicr/api/categories';
import { ProductComponentsModule } from '@musicr/api/product-components';
import { ProductsModule } from '@musicr/api/products/feature';
import { SubcategoriesModule } from '@musicr/api/subcategories';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppServerModule } from '../../../store/src/app/app.server.module';
import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/musicr-store/browser'),
    }),
    TypeOrmModule.forRoot(config),
    AdditionalOptionsModule,
    AuthModule,
    CategoriesModule,
    ProductsModule,
    ProductComponentsModule,
    SubcategoriesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
