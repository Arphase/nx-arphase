import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { PlacesModule } from '@valmira/api/places';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';

@Module({
  imports: [TypeOrmModule.forRoot(config), AuthModule, PlacesModule],
  controllers: [AppController],
})
export class AppModule {}
