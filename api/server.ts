import cors from 'cors';
import * as jsonServer from 'json-server';

const server = jsonServer.create();
server.use(cors());
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults({ logger: true });

const port = process.env.PORT ?? 9000;

server.use(middlewares);
server.use(router);

server.listen(port, () => {
    console.info(`JSON Server API is running on port: ${port}`);
});
