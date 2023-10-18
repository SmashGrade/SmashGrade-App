import * as jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: '.' });

const port = process.env.PORT ?? 3000;

server.use(middlewares);
server.use(router);
server.listen(port, () => {
    console.log('JSON Server is running on port: ' + port);
});
