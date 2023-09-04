import { BaseEntity } from '../CustomBaseEntity.ts';
import { Contact } from './Contact.ts';
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';

@Entity()
class Category extends BaseEntity {
  @Property()
  name!: string;

  @OneToMany(
    () => Contact,
    ({ category }) => category,
  )
  contacts = new Collection<Contact>(this);
}

export { Category };
