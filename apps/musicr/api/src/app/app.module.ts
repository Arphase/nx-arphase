import { AdditionalOptionsModule } from '@musicr/api/additional-options';
import { AuthModule } from '@musicr/api/auth';
import { CategoriesModule } from '@musicr/api/categories';
import { ContactModule } from '@musicr/api/contact';
import { CustomersModule } from '@musicr/api/customers';
import { MusicrApiDbModule } from '@musicr/api/db';
import { OrdersModule } from '@musicr/api/orders';
import { PhotosModule } from '@musicr/api/photos';
import { PriceOptionsModule } from '@musicr/api/price-options';
import { ProductsModule } from '@musicr/api/products';
import { SubcategoriesModule } from '@musicr/api/subcategories';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppServerModule } from '@musicr/store/app.server.module';
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { AngularUniversalModule } from '@qupaya/nestjs-ng-universal';
import { join } from 'path';

@Module({
  imports: [
    ...(process.env['NODE' + '_ENV'] === 'production'
      ? [
          AngularUniversalModule.forRoot({
            bootstrap: AppServerModule,
            viewsPath: join(process.cwd(), 'dist/apps/musicr/browser'),
          }),
        ]
      : []),
    MusicrApiDbModule,
    ThrottlerModule.forRoot(),
    AdditionalOptionsModule,
    AuthModule,
    CategoriesModule,
    ContactModule,
    CustomersModule,
    OrdersModule,
    PhotosModule,
    PriceOptionsModule,
    ProductsModule,
    SubcategoriesModule,
  ],
})
export class AppModule {}
