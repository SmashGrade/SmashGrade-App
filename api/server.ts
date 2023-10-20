import * as jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ static: '.' });

const port = process.env.PORT ?? 3000;

server.use(middlewares);
server.use('/api', router);
server.listen(port, () => {
    console.info(`JSON Server is running on: ${port}/api`);
});
