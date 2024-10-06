import WebSocket from 'ws'
import events from './socket.events'

function route(wss: WebSocket.Server) {
  wss.on('connection', events.onConnection)
}

export default {
  route
}
