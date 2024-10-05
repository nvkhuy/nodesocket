import express, { Request, Response } from 'express';
import WebSocket, { Server } from 'ws';
import http from 'http';
import jwt from 'jsonwebtoken';
import bodyParser from 'body-parser';

const app = express();
const PORT = 8080;
const SECRET_KEY = 'super123';

// Use body-parser middleware to parse JSON bodies in POST requests
app.use(bodyParser.json());

// Create an HTTP server that uses the Express app as its handler
const server = http.createServer(app);

// Attach a WebSocket server to the HTTP server
const wss = new Server({ server });

// Middleware to extract token and verify it from the HTTP headers
function authenticate(req: http.IncomingMessage): { valid: boolean; payload?: any } {
    const authHeader = req.headers['authorization'];

    if (!authHeader) {
        return { valid: false };
    }

    const token = authHeader.split(' ')[1]; // Extract token from "Bearer <token>"
    try {
        // Verify the token and extract the payload
        const payload = jwt.verify(token, SECRET_KEY);
        return { valid: true, payload };
    } catch (err) {
        console.error('Invalid token:', (err as Error).message);
        return { valid: false };
    }
}

// WebSocket connection handler
function onWSConnection(ws: WebSocket, req: http.IncomingMessage) {
    const authResult = authenticate(req);

    if (!authResult.valid) {
        ws.send('Unauthorized: Invalid token');
        ws.close(1008, 'Unauthorized'); // 1008: Policy Violation
        return;
    }

    const userPayload = authResult.payload;
    console.log(`New client connected with payload: ${JSON.stringify(userPayload)}`);

    // Send a welcome message
    ws.send(`Welcome to the WebSocket server, ${userPayload.username || 'User'}!`);

    // Handle incoming messages from WebSocket clients
    ws.on('message', (message: string) => {
        console.log(`Received: ${message}`);
        ws.send(`You said: ${message}`);
    });

    // Handle WebSocket connection close
    ws.on('close', () => {
        console.log('Client disconnected');
    });
}

// Attach WebSocket connection handler
wss.on('connection', onWSConnection);

// REST API login route to authenticate user and return a JWT token
app.post('/login', (req: Request, res: Response) => {
    const { username, password } = req.body;

    // Mock user validation (replace with database validation in real applications)
    const user = users.find(u => u.username === username && u.password === password);
    if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Generate a JWT token with the username embedded
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: '1h' });

    // Return the token in the response
    res.json({ token: `Bearer ${token}` });
});

// Mock user data (replace with real user validation in production)
const users = [
    { username: 'john', password: 'password123' },
    { username: 'jane', password: 'password456' }
];

// Start the server on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`WebSocket server is also available on ws://localhost:${PORT}`);
});
