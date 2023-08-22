import { defineConfig } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const config = defineConfig<PostgreSqlDriver>({
  dbName: process.env.POSTGRES_DB,
  entities: ['./dist/**/entities'],
  entitiesTs: ['./src/database/entities'],
  type: 'postgresql',
  port: Number(process.env.POSTGRES_DATABASE_PORT),
  host: process.env.POSTGRES_HOST,
  password: process.env.POSTGRES_PASSWORD,
  user: process.env.POSTGRES_USER,
});

export default config;
