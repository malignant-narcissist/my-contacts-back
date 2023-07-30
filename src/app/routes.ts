import Controller from './controllers/ContactsController';
import { ServerRoute } from '@hapi/hapi';

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/contacts',
    handler: Controller.index,
  },
  {
    method: 'GET',
    path: '/contacts/{id}',
    handler: Controller.show,
  },
  {
    method: 'DELETE',
    path: '/contacts/{id}',
    handler: Controller.delete,
  },
];

export { routes };
