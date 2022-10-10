import { AngularUniversalModule, loadEsmModule } from '@arphase/api/core';
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
import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { join } from 'path';

// eslint-disable-next-line @nrwl/nx/enforce-module-boundaries
@Module({
  imports: [
    AngularUniversalModule.forRoot(async () => {
      const angularModule = await loadEsmModule<{ default: typeof import('../../../store/src/app/app.server.module') }>(
        join(process.cwd(), 'dist/apps/musicr/browser')
      );

      return {
        bootstrap: angularModule.default.AppServerModule,
        ngExpressEngine: (angularModule.default as any).ngExpressEngine,
        viewsPath: join(process.cwd(), 'dist/apps/musicr/browser'),
      };
    }),
    MusicrApiDbModule,
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
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
