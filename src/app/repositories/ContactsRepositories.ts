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
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
