import { BaseEntity } from '../CustomBaseEntity';
import { Category } from './Category';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';

@Entity({
  tableName: 'contacts',
})
class Contacts extends BaseEntity {
  @Property()
  name!: string;

  @Property({
    unique: true,
  })
  email!: string;

  @Property({
    nullable: true,
  })
  phone?: string;

  @ManyToOne(() => Category, {
    nullable: true,
  })
  category?: Category;
}

export { Contacts };
