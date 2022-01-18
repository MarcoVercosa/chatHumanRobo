import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { RoboIMC } from "./functionRoboIMC"
import { RoboReservatoriosSP } from "./functionRoboReservatoriosSP"

const app = express()

app.use(cors)

const server = http.createServer(app)

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET,", "POST"]
    }
})

let store: any = {}
//armazena id e seus respectivos userNames

io.on("connection", (socket: any) => {
    console.log("User Connected", socket.id)

    //criar e juntar a sala criada
    socket.on("join_user_idSocket", (data: any) => {

        console.log("socket join_user_idSocket")

        //checka se o user existe no store. Se não, o adiciona
        let userAlreadyExists: any = false
        //key armazena a chave do obj e o value, o valor
        // for (let [key, value] of Object.entries(store)) {
        for (let temp in store) {
            if (store[temp] === data.userName) {
                console.log("User already exists")
                userAlreadyExists = true
                break
            }
        }
        if (!userAlreadyExists) {
            console.log("User add no store")
            store[socket.id] = data.userName
            console.log(store)

            socket.emit("receive_uservalidation_from_server", ({ sucess: true }))
        } else {
            socket.emit("receive_uservalidation_from_server", ({ sucess: false, message: "User already exist !" }))
        }
    })

    socket.on("join_room", (id_room: string) => {
        socket.join(id_room)
        console.log(`User with ID ${socket.id} joined room: ${id_room}`)
    })

    //enviar mensagem a todos da sala
    socket.on("send_message_to_room", (data: any) => {
        console.log(data)
        socket.in(data.room).emit("received_message_from_room", data)
    })

    socket.on("send_message_to_single_person", (data: any) => {
        // socket.emit("received_message_from_single_person", data)
        socket.to("to").emit("received_message_from_single_person", {
            content: "content",
            from: socket.id,
        });
    })


    socket.on("send_message_to_robo_imc", (data: any) => {
        console.log(data)
        RoboIMC(socket, data)
    })
    socket.on("send_message_to_robo_reservatorios_sp", async (data: any) => {
        console.log(data)
        RoboReservatoriosSP(socket, data)

    })


    //disconectar
    socket.on("disconnect", () => {

        //deleta o id do usuário na variavel store
        delete store[socket.id]
        console.log("User Disconnecteddd", socket.id)
    })
})

server.listen(3001, () => {
    console.log("Server is running");
})