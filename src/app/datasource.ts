import { monotonicFactory } from 'ulid';

type ContactFields = 'id' | 'name' | 'email' | 'phone' | 'categoryId';

type Contact<
  Key extends ContactFields = ContactFields,
  S extends string = string,
> = {
  [key in Key]: S;
};

const contacts = new Set<Contact>();

const contact: Contact = {
  id: monotonicFactory()(),
  name: 'Josh Shadle',
  categoryId: monotonicFactory()(),
  email: 'josh.shadle@mail.com',
  phone: '(81) 98890-9310',
};

contacts.add(contact);

export { contacts, Contact };
