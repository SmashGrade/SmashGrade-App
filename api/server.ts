import * as jsonServer from 'json-server';

const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

const port = process.env.PORT ?? 9000;

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Accept', '*');
    next();
});
server.listen(port, () => {
    console.info(`JSON Server API is running on port: ${port}`);
});
