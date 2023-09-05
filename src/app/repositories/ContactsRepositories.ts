import { Category } from '../../database/entities/Category.ts';
import { Contact } from '../../database/entities/Contact.ts';
import { mainOrm } from '../../database/source.ts';
import { EntityRepository } from '@mikro-orm/core';

class ContactsRepository {
  private em: EntityRepository<Contact>;

  constructor() {
    this.em = mainOrm.em.fork().getRepository(Contact);
  }

  async findAll() {
    const contacts = await this.em.findAll({
      fields: [
        '*',
        {
          category: ['*'],
        },
      ],
    });

    return contacts;
  }

  async findById(id: string) {
    const contact = await this.em.findOne(
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

  async findByEmail(email: string) {
    const contact = await this.em.findOne(
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

  async removeById(id: string): Promise<Contact | undefined> {
    const contact = await this.em.findOne(
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

    await this.em.nativeDelete({
      ...contact,
    });

    return contact ?? undefined;
  }

  async createContact({
    categoryId,
    ...data
  }: Omit<Contact, 'id' | 'category'> & {
    categoryId?: string;
  }): Promise<Contact> {
    let category: Category | undefined;

    if (categoryId) {
      category =
        (await this.em
          .getEntityManager()
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

    const contact = this.em.create({ ...data, category });

    await this.em.nativeInsert(contact);

    return contact;
  }

  async update(
    data: Partial<Omit<Contact, 'id'>> & Pick<Contact, 'id'>,
  ): Promise<Contact | undefined> {
    const contact = await this.em.findOne(
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

      await this.em.upsert(updatedContact);

      return updatedContact;
    }

    return undefined;
  }
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
