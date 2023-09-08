import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import config from './mikro-orm.config.ts';

const mainOrm = await MikroORM.init<PostgreSqlDriver>(config);

export { mainOrm };
