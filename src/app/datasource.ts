import { monotonicFactory } from 'ulid';

type ContactFields = 'id' | 'name' | 'email' | 'phone' | 'category_id';

type Contact<
  Key extends ContactFields = ContactFields,
  S extends string = string,
> = {
  [key in Key]: S;
};

const contacts = new Map<string, Contact>();

const contactOne: Contact = {
  id: '12',
  name: 'Josh Shadle',
  category_id: monotonicFactory()(),
  email: 'josh.shadle@mail.com',
  phone: '(81) 98890-9310',
};

const contactTwo: Contact = {
  id: '13',
  name: 'Yusuf Akc',
  category_id: monotonicFactory()(),
  email: 'r@mail.com',
  phone: '(81) 99876-9930',
};

contacts.set(contactOne.id, contactOne);

contacts.set(contactTwo.id, contactTwo);

export { contacts, Contact };
