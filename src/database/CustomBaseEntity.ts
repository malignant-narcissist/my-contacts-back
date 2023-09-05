import { PrimaryKey, Property } from '@mikro-orm/core';
import { monotonicFactory } from 'ulid';

interface ICustomBaseEntity {
  id: string;
  createdAt: Date;
  updatetAt: Date;
}

abstract class BaseEntity implements ICustomBaseEntity {
  @PrimaryKey({
    type: 'varchar',
  })
  id: string = monotonicFactory()();

  @Property()
  createdAt: Date = new Date();

  @Property()
  updatetAt: Date = new Date();
}

export { ICustomBaseEntity, BaseEntity };
