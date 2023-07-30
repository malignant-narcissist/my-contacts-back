import { Contact, contacts } from '../datasource';

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
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
