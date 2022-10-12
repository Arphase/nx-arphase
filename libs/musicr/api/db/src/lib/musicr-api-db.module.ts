import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeormConfig } from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig)],
  exports: [TypeOrmModule],
})
export class MusicrApiDbModule {}
