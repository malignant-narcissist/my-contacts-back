import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { PostgreSqlDriver } from '@mikro-orm/postgresql';
import { Inject, Service } from 'typedi';
import { Category } from '../../database/entities/Category.ts';
import { Contact } from '../../database/entities/Contact.ts';
import { MIKRO_ORM_ENTITY_MANAGER_TOKEN } from '../../infra/container.ts';

@Service()
class ContactsRepository {
  constructor(
    @Inject(MIKRO_ORM_ENTITY_MANAGER_TOKEN)
    private readonly orm: MikroORM<PostgreSqlDriver>,
  ) {}

  @UseRequestContext()
  public async findAll() {
    const contacts = await this.orm.em.getRepository(Contact).findAll({
      fields: [
        '*',
        {
          category: ['*'],
        },
      ],
    });

    return contacts;
  }

  @UseRequestContext()
  async findById(id: string) {
    const contact = await this.orm.em.getRepository(Contact).findOne(
      {
        id,
      },
      {
        fields: [
          '*',
          {
            category: ['*'],
          },
        ],
      },
    );

    return contact;
  }

  @UseRequestContext()
  async findByEmail(email: string) {
    const contact = await this.orm.em.getRepository(Contact).findOne(
      {
        email,
      },
      {
        fields: [
          '*',
          {
            category: ['*'],
          },
        ],
      },
    );

    return contact;
  }

  @UseRequestContext()
  async removeById(id: string): Promise<Contact | undefined> {
    const contact = await this.orm.em.getRepository(Contact).findOne(
      {
        id,
      },
      {
        fields: [
          '*',
          {
            category: ['*'],
          },
        ],
      },
    );

    await this.orm.em.getRepository(Contact).nativeDelete({
      ...contact,
    });

    return contact ?? undefined;
  }

  @UseRequestContext()
  async createContact({
    categoryId,
    ...data
  }: Omit<Contact, 'id' | 'category'> & {
    categoryId?: string;
  }): Promise<Contact> {
    let category: Category | undefined;

    if (categoryId) {
      category =
        (await this.orm.em
          .findOne(Category, {
            id: categoryId,
          })
          .catch((err) => {
            console.error(err);
          })) ?? undefined;

      if (!category) {
        throw new Error('Categoria não encontrada');
      }
    }

    const contact = this.orm.em
      .getRepository(Contact)
      .create({ ...data, category });

    await this.orm.em.getRepository(Contact).nativeInsert(contact);

    return contact;
  }

  @UseRequestContext()
  async update(
    data: Partial<Omit<Contact, 'id'>> & Pick<Contact, 'id'>,
  ): Promise<Contact | undefined> {
    const contact = await this.orm.em.getRepository(Contact).findOne(
      {
        id: data.id,
      },
      {
        fields: [
          '*',
          {
            category: ['*'],
          },
        ],
      },
    );

    if (contact) {
      const contactCategory = data.category ?? contact.category;

      const updatedContact: Contact = {
        ...contact,
        ...data,
        category: contactCategory,
      };

      await this.orm.em.getRepository(Contact).upsert(updatedContact);

      return updatedContact;
    }

    return undefined;
  }
}

export { ContactsRepository };
