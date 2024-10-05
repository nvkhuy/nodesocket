import express, {Express} from 'express';
import WebSocket, {Server} from 'ws';
import http from 'http';
import {RouterV1} from "./router/api";
import config from './utils/config';
import socketRouter from "./socket/router";

const PORT = config.PORT;
const app: Express = express();

app.use('/api', RouterV1)
const server: http.Server = http.createServer(app);

const wss: WebSocket.Server = new Server({server: server});
socketRouter.route(wss)

// Start the server on the specified port
server.listen(PORT, () => {
    console.log(`REST API running on:${PORT}`);
    console.log(`WEB SOCKET running on:${PORT}`);
});
