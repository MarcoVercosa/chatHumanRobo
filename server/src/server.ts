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
//var para armazenar id e seus respectivos userNames
//a var é comporta por obj socket.id:userName

io.on("connection", (socket: any) => {
    console.log("User Connected", socket.id)

    //armazenar id e seus respectivo userName
    socket.on("join_user_idSocket", (data: any) => {

        console.log("socket join_user_idSocket")

        //checka se o user existe na var store. Se não, o adiciona
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
            //add no obj store socket.id:userName
            store[socket.id] = data.userName
            console.log(store)

            socket.emit("receive_uservalidation_from_server", ({ sucess: true }))
        } else {
            socket.emit("receive_uservalidation_from_server", ({ sucess: false, message: "User already exist !" }))
        }
    })

    socket.on("join_room", (nameRoom: string) => {
        socket.joi(nameRoom)
        console.log(`User with ID ${socket.id} joined room: ${nameRoom}`)
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