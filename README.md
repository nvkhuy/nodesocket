# NodeSocket

---

A Node.js application that combines both REST API and WebSocket functionality. This project features a Node.js server using Express.js that handles authentication, along with a WebSocket server that uses the same authentication mechanism, both running on the same port.

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Technologies Used](#technologies-used)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Server](#running-the-server)
-   [API Documentation](#apiRouter-documentation)
    -   [Authentication Endpoint](#authentication-endpoint)
-   [WebSocket Communication](#websocket-communication)
    -   [Connecting to WebSocket Server](#connecting-to-websocket-server)
-   [Scripts](#scripts)
-   [License](#license)

## Overview

This project demonstrates how to create a Node.js application that combines both REST API and WebSocket servers using Express.js and the `ws` library. The application includes:

1. **User Authentication**: A REST API endpoint to authenticate usersRepo and return a JSON Web Token (JWT).
2. **WebSocket Server**: A WebSocket server that shares the same port as the REST API and uses JWT-based authentication.

## Features

-   REST API for user authentication.
-   JWT-based authentication for both REST and WebSocket connections.
-   WebSocket server integrated on the same port as the REST API.
-   Example implementation of token-based authentication middleware.
-   Secure communication between the client and server using WebSockets.

## Technologies Used

-   Node.js
-   Express.js
-   WebSocket (`ws` library)
-   JSON Web Tokens (`jsonwebtoken`)
-   TypeScript (optional, can be configured for type safety)

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

-   [Node.js](https://nodejs.org/) (v14 or higher)
-   [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/nvkhuy/nodesocket.git
    cd nodesocket
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

### Running the Server

1. Start the development server:

    ```bash
    npm run dev
    ```

2. Build the server for production:
    ```bash
    npm run build
    ```

The server will be running on `http://localhost:8080` for both REST and WebSocket connections.

## API Documentation

### Authentication Endpoint

**POST** `/login`

-   Description: Authenticates a user and returns a JWT token.
-   Request Body:
    ```json
    {
        "username": "john",
        "password": "password123"
    }
    ```
-   Response:
    ```json
    {
        "token": "Bearer <your_jwt_token>"
    }
    ```
-   Response Codes:
    -   `200 OK`: Authentication successful, returns the token.
    -   `401 Unauthorized`: Invalid username or password.

### Middleware for Authentication

The application uses a middleware function to extract the JWT token from the request headers and verify it before granting access to secured routes or WebSocket connections.

## WebSocket Communication

### Connecting to WebSocket Server

To connect to the WebSocket server, you need to include the JWT token in the `Authorization` header during the initial handshake.

```javascript
// Use body-parser middleware to parse JSON bodies in POST requests
app.use(bodyParser.json())

// Create an HTTP server that uses the Express app as its handler
const server = http.createServer(app)

// Attach a WebSocket server to the HTTP server
const wss = new Server({ server })

// ...

// Start the server on the specified port
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
    console.log(`WebSocket server is also available on ws://localhost:${PORT}`)
})
```

### Secured WebSocket Messages

The server verifies the token during the WebSocket connection. Unauthorized usersRepo will be disconnected automatically.

## Scripts

The following npm scripts are available:

-   **`npm run dev`**: Runs the server in development mode with automatic reloads.
-   **`npm run build`**: Compiles the server for production.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

### Additional Tips:

-   Modify the license section based on your licensing requirements.
