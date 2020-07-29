import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { environment } from '@env/environment';
import { UserEntity } from '@api/users/data/user.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: environment.databaseConfig.type,
  host: process.env.RDS_HOSTNAME || environment.databaseConfig.host,
  port: Number(process.env.RDS_PORT) || environment.databaseConfig.port,
  database: process.env.RDS_DB_NAME || environment.databaseConfig.database,
  entities: [UserEntity],
  synchronize:
    Boolean(process.env.TYPEORM_SYNC) || environment.databaseConfig.synchronize,
};
