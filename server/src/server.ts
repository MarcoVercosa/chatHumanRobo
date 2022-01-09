import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

const app = express()

app.use(cors)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET,", "POST"]

    }
})

io.on("connection", (socket) => {
    console.log("User Connected", socket.id, socket.data)

    socket.on("join_room", (id_room: string) => {
        socket.join(id_room)
        console.log(`User with ID ${socket.id} joined room: ${id_room}`)
    })

    socket.on("send_message", (data: any) => {
        socket.in(data.room).emit("received_message", data)
    })

    socket.on("disconnect", () => {
        //quando o navegador fecha, chama automaticamente
        console.log("User Disconnected", socket.id)
    })
})

server.listen(3001, () => {
    console.log("Server is running");
})