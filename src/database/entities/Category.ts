import { BaseEntity } from '../CustomBaseEntity';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
class Category extends BaseEntity {
  @Property()
  name!: string;
}

export { Category };
