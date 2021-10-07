import { AdditionalOptionsModule } from '@musicr/api/additional-options';
import { AuthModule } from '@musicr/api/auth';
import { CategoriesModule } from '@musicr/api/categories';
import { ContactModule } from '@musicr/api/contact';
import { OrdersModule } from '@musicr/api/orders';
import { PhotosModule } from '@musicr/api/photos';
import { PriceOptionsModule } from '@musicr/api/price-options';
import { ProductsModule } from '@musicr/api/products';
import { SubcategoriesModule } from '@musicr/api/subcategories';
import { Module } from '@nestjs/common';
import { AngularUniversalModule } from '@nestjs/ng-universal';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import { AppServerModule } from '../../../store/src/app/app.server.module';
import config from '../db/config/ormconfig';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
@Module({
  imports: [
    AngularUniversalModule.forRoot({
      bootstrap: AppServerModule,
      viewsPath: join(process.cwd(), 'dist/apps/musicr/browser'),
    }),
    TypeOrmModule.forRoot(config),
    AdditionalOptionsModule,
    AuthModule,
    CategoriesModule,
    ContactModule,
    OrdersModule,
    PhotosModule,
    PriceOptionsModule,
    ProductsModule,
    SubcategoriesModule,
  ],
})
export class AppModule {}
