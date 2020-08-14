export interface Environment {
  production: boolean;
  databaseConfig: {
    type: 'postgres';
    host: string;
    port: number;
    database: string;
    synchronize: boolean;
    username: string;
    password: string;
  };
  server: {
    port: number;
  };
  jwt: {
    secret: string;
    expiresIn: number
  };
}
