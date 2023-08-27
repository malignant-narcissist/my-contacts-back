import { BaseEntity } from '../CustomBaseEntity';
import { Contacts } from './Contact';
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';

@Entity()
class Category extends BaseEntity {
  @Property()
  name!: string;

  @OneToMany(
    () => Contacts,
    ({ category }) => category,
  )
  contacts = new Collection<Contacts>(this);
}

export { Category };
