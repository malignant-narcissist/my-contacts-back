import Controller from './controllers/ContactsController';
import { ServerRoute } from '@hapi/hapi';

const routes: ServerRoute[] = [
  {
    method: 'GET',
    path: '/contacts',
    handler: Controller.index,
  },
];

export { routes };
