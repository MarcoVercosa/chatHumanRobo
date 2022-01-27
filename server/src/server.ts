import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { Sockets } from "./socketsListeners/socketListeners"

const app = express()

app.use(cors)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET,", "POST"]
    }
})

//listeners dos Sockets
Sockets(io)

server.listen(8889, () => {
    console.log("Server is running 8889");
})

