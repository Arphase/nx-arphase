import { ProductsModule } from '@musicr/api/products';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), ProductsModule],
  controllers: [AppController],
})
export class AppModule {}
