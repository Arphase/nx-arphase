import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

import config from '../db/config/ormconfig';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { GuaranteesModule } from './guarantees';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'innovatech-client'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot(config),
    AuthModule,
    GuaranteesModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
