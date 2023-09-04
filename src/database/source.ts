import config from './mikro-orm.config.ts';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

let orm: MikroORM<PostgreSqlDriver>;

MikroORM.init<PostgreSqlDriver>(config)
  .then((instance) => {
    orm = instance;
  })
  .catch((err) => {
    console.error(err);
  });

export { orm };
