import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '@valmira/api/auth';
import { ReservationEntity } from '@valmira/api/domain';

import { ReservationsController } from './controllers/reservations.controller';
import { ReservationsService } from './servicess/reservations.service';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([ReservationEntity])],
  controllers: [ReservationsController],
  providers: [ReservationsService],
})
export class ReservationsModule {}
