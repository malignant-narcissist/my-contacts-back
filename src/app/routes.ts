import { ServerRoute } from '@hapi/hapi';
import { Container } from 'typedi';
import { ContactsController } from './controllers/ContactsController.ts';

const contactsController = Container.get(ContactsController);

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/contacts',
    handler: (...args) => contactsController.index(...args),
  },
  {
    method: 'GET',
    path: '/contacts/{id}',
    handler: (...args) => contactsController.show(...args),
  },
  {
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: (...args) => contactsController.delete(...args),
  },
  {
    method: 'POST',
    handler: (...args) => contactsController.store(...args),
    path: '/contacts',
  },
  {
    method: 'PATCH',
    handler: (...args) => contactsController.update(...args),
    path: '/contacts',
  },
];

export { routes };
