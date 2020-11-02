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
  host: {
    url: string;
    port: string;
  };
  mail: {
    host: string;
    port: string;
    secure: false;
    user: string;
    pass: string;
  };
}
