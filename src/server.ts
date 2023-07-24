import Hapi from '@hapi/hapi';

const serverInit = async () => {
    const server = Hapi.server({
        port: 3333,
        host: 'localhost',
    });
    
    server.route({
        method: 'GET',
        path: '/',
        handler() {
            return 'It worked!'
        }
    })
    
    await server.start();
    
    console.log('Server running on %s', server.info.uri);
}

process.on('unhandledRejection', (err) => {
    console.log(err);
    process.exit(1);
})

serverInit();
