import express from "express"
import cors from "cors"
import https from "https"
import { Server } from "socket.io"
import fs from "fs"
const path = require("path");


import { Sockets } from "./socketsListeners/socketListeners"

const app = express()
// app.use(cors)

const options: any = {
    key: fs.readFileSync(path.resolve(__dirname, "../security/certificado.key")),
    cert: fs.readFileSync(path.resolve(__dirname, "../security/certificado.cert"))
}


const server = https.createServer(options, app) as any

app.get("/", (req, res) => {
    res.send('Hello World!')
})

const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET,", "POST"]
    }
})

//chama função ativando os listeners dos Sockets
Sockets(io)

// server.listen(8889, () => {
//     console.log("Server is running 8889");
// })

server.listen(443, () => {
    console.log("Server is running 443");
})

