import Hapi from '@hapi/hapi';
import 'dotenv/config';
import { routes } from './app/routes.ts';

const serverInit = async () => {
  const server = Hapi.server({
    port: 3333,
    host: 'localhost',
  });

  server.route(routes);

  await server.start();

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log(err);
  process.exit(1);
});

serverInit();
