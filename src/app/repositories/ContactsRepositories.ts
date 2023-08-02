import { Contact, contacts } from '../datasource';
import { monotonicFactory } from 'ulid';

class ContactsRepository {
  private contacts: Map<string, Contact>;

  constructor() {
    this.contacts = contacts;
  }

  async findAll() {
    return Array.from(this.contacts.values());
  }

  async findById(id: string) {
    const contact = contacts.get(id);

    return contact;
  }

  async findByEmail(email: string) {
    const contacts = Array.from(this.contacts.values());

    const contact = contacts.find((c) => c.email === email);

    return contact;
  }

  async removeById(id: string): Promise<Contact | undefined> {
    const contact = this.contacts.get(id);

    this.contacts.delete(id);

    return contact;
  }

  async createContact(data: Omit<Contact, 'id'>): Promise<Contact> {
    const contact: Contact = {
      ...data,
      id: monotonicFactory()(),
    };

    this.contacts.set(contact.id, contact);

    return contact;
  }

  async update(
    data: Partial<Omit<Contact, 'id'>> & Pick<Contact, 'id'>,
  ): Promise<Contact | undefined> {
    const contact = this.contacts.get(data.id);

    if (contact) {
      const updatedContact = {
        ...contact,
        ...data,
      };

      this.contacts.set(data.id, updatedContact);

      return updatedContact;
    }

    return contact;
  }
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
