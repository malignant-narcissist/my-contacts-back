import { Contact, contacts } from '../datasource';

class ContactsRepository {
  private contacts: Set<Contact>;

  constructor() {
    this.contacts = contacts;
  }

  async findAll() {
    return Array.from(this.contacts.values());
  }
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
