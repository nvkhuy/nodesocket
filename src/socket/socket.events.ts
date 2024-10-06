import WebSocket from 'ws'
import http from 'http'
import auth from '../middleware/auth.middleware'

function onConnection(ws: WebSocket, req: http.IncomingMessage) {
  const { valid: isValid, payload: userPayload } = auth.validateToken(req.headers['authorization'])

  if (!isValid) {
    ws.send('Unauthorized: Invalid token')
    ws.close(1008, 'Unauthorized') // 1008: Policy Violation
    return
  }

  console.log(`New client connected with payload: ${JSON.stringify(userPayload)}`)

  ws.send(`Welcome to the WebSocket server, ${userPayload.username || 'User'}!`)

  ws.on('message', (message: string) => {
    console.log(`Received: ${message}`)
    ws.send(`You said: ${message}`)
  })

  ws.on('close', () => {
    console.log('Client disconnected')
  })
}

export default {
  onConnection
}
