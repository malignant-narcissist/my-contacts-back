import { routes } from './app/routes.ts';
import Hapi from '@hapi/hapi';

const serverInit = async () => {
  const server = Hapi.server({
    port: 3333,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();

  // rome-ignore lint/nursery/noConsoleLog: <explanation>
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  // rome-ignore lint/nursery/noConsoleLog: <explanation>
  console.log(err);
  process.exit(1);
});

serverInit();
