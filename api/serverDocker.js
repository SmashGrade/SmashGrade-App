const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Accept', '*');
    next();
});
server.listen(3000, () => {
    console.log('JSON Server is running');
});
/*
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('../db.json');
const middlewares = jsonServer.defaults();
const cors = require('cors');

server.use(
    cors({
        origin: true,
        credentials: true,
        preflightContinue: false,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
);
server.options('*', cors());
server.use(middlewares);
server.use(router);
server.listen(3000, () => {
    console.log('JSON Server is running');
});
*/
