import { monotonicFactory } from 'ulid';

type ContactFields = 'id' | 'name' | 'email' | 'phone' | 'categoryId';

type Contact<
  Key extends ContactFields = ContactFields,
  S extends string = string,
> = {
  [key in Key]: S;
};

const contacts = new Map<string, Contact>();

const contactOne: Contact = {
  id: monotonicFactory()(),
  name: 'Josh Shadle',
  categoryId: monotonicFactory()(),
  email: 'josh.shadle@mail.com',
  phone: '(81) 98890-9310',
};

contacts.set(contactOne.id, contactOne);

export { contacts, Contact };
