import { BaseEntity } from '../CustomBaseEntity.ts';
import { Category } from './Category.ts';
import { Entity, ManyToOne, Property, Rel } from '@mikro-orm/core';

@Entity({
  tableName: 'contacts',
})
class Contact extends BaseEntity {
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
  category?: Rel<Category>;
}

export { Contact };
