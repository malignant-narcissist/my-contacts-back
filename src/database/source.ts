import config from './mikro-orm.config.ts';
import { MikroORM } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';

const mainOrm = await MikroORM.init<PostgreSqlDriver>(config);

export { mainOrm };
