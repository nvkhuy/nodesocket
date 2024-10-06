import express, { Express } from 'express'
import WebSocket, { Server } from 'ws'
import http from 'http'
import { routerV1 } from './router/api.router'
import config from './utils/config'
import socketRouter from './socket/socket.router'

const PORT: number | string = config.PORT
const app: Express = express()

app.use('/api', routerV1)
const server: http.Server = http.createServer(app)

const wss: WebSocket.Server = new Server({ server: server })
socketRouter.route(wss)

server.listen(PORT, () => {
  console.log(`REST API running on:${PORT}`)
  console.log(`WEB SOCKET running on:${PORT}`)
})
