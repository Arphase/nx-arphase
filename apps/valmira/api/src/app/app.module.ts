import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { CategoriesModule } from '@valmira/api/categories';
import { PlacesModule } from '@valmira/api/places';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, CategoriesModule, PlacesModule],
  controllers: [AppController],
})
export class AppModule {}
