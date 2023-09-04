import Controller from './controllers/ContactsController.ts';
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
  {
    method: 'POST',
    handler: Controller.store,
    path: '/contacts',
  },
  {
    method: 'PATCH',
    handler: Controller.update,
    path: '/contacts',
  },
];

export { routes };
