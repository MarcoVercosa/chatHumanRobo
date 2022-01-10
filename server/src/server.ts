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
    //criar e juntar a sala criada
    socket.on("join_room", (id_room: string) => {
        socket.join(id_room)
        console.log(`User with ID ${socket.id} joined room: ${id_room}`)
    })

    //enviar mensagem a todos da sala
    socket.on("send_message_room", (data: any) => {
        console.log(data)
        socket.in(data.room).emit("received_message", data)
    })


    socket.on("send_message_to_robo_imc", (data: any) => {
        console.log(data)
        socket.emit("received_message_from_robo", `olá. sou um robô IMC. Seu ID é: ${socket.id}`)

    })
    socket.on("send_message_to_robo_reservatorios", (data: any) => {
        console.log(data)
        socket.emit("received_message_from_robo", `olá. sou um robô Water. Seu ID é: ${socket.id}`)

    })

    socket.on("send_message_to_single_person", (data: any) => {
        socket.emit("received_message_from_single_person", data)
    })

    //disconectar
    socket.on("disconnect", () => {
        //quando o navegador fecha, chama automaticamente
        console.log("User Disconnected", socket.id)
    })
})

server.listen(3001, () => {
    console.log("Server is running");
})