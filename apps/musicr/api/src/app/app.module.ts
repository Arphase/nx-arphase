import { AuthModule } from '@musicr/api/auth';
import { CategoriesModule } from '@musicr/api/categories';
import { ProductsModule } from '@musicr/api/products';
import { SubcategoriesModule } from '@musicr/api/subcategories';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppServerModule } from '../../../store/src/app/app.server.module';
import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/musicr-store/browser'),
    }),
    TypeOrmModule.forRoot(config),
    AuthModule,
    CategoriesModule,
    ProductsModule,
    SubcategoriesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
