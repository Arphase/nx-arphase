import { Module } from '@nestjs/common';

import { GuaranteesModule } from './guarantees';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from '../config/typeorm.config';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { ServeStaticModule } from '@nestjs/serve-static'; // <- INSERT LINE
import { AppController } from './app.controller';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'innovatech-client'),
      exclude: ['/api*'],
    }),
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    GuaranteesModule,
  ],
  controllers:[AppController]
})
export class AppModule {}
