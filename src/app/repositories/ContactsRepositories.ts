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
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
