import { Contact, contacts } from '../datasource';

class ContactsRepository {
  private contacts: Set<Contact>;

  constructor() {
    this.contacts = contacts;
  }

  async findAll() {
    return Array.from(this.contacts.values());
  }

  async findById(id: string) {
    const contact = Array.from(this.contacts).find((i) => {
      return i.id === id;
    });

    return contact;
  }
}

const contactsRepository = new ContactsRepository();

export default contactsRepository;
