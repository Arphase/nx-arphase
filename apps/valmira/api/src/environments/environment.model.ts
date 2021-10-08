export interface Environment {
  production: boolean;
  databaseConfig: {
    type: string;
    host: string;
    port: number;
    database: string;
    synchronize: boolean;
    username: string;
    password: string;
  };
  server: { port: number };
  environmentName: string;
}
