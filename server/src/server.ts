import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { RoboIMC } from "./functionRoboIMC"
import { RoboReservatoriosSP } from "./functionRoboReservatoriosSP"
import { CreateChatPrivateServer } from "./functionCreateChatPrivate"
import { SendMenssageToPrivate } from "./functionSendMessageToPrivate"
import { CreateRoom } from "./functionCreateRoom"
import { JoinRoom } from "./functionJoinRoom"

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
//a var é composta por obj socket.id:userName
//ex: 389389e9cdc8cdc8dcd:Marco vercosa

let storeRooms: any = {}
//var para armazenar id e seus respectivos rooms
//a var é composta por obj roomName:socket.id:
//ex: NewRoom:2j32k32323kknjjnj3

io.on("connection", (socket: any) => {
    console.log("User Connected", socket.id)

    //Tela de login - armazenar id e seus respectivo userName
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

    //checa se o id ou user existem, devolve as info para o solicitante
    // para que o client crie um chat no navegador
    // e envia para o destinatario a solicitaçao para criar um chat no navegador dle tambem
    socket.on("create_chat_private_server", (data: any) => {
        console.log("Solicitado criação de chat private")
        CreateChatPrivateServer(socket, data, store)
    })

    //conversa com unica pessoa - Chat Privado
    socket.on("send_message_to_private", (message: any) => {
        console.log("solciitado mensagem privada")
        SendMenssageToPrivate(socket, message)
    })

    //cria uma sala
    socket.on("create_room", (data: any) => {
        console.log("create_room")
        CreateRoom(data, storeRooms, socket)
    })

    //adiciona o usuario a uma sala
    socket.on("join_room", (data: any) => {
        console.log("join_room")
        JoinRoom(data, storeRooms, socket)

    })

    //enviar mensagem a todos da sala
    socket.on("send_message_to_chat_room", (data: any) => {
        console.log(data)
        socket.in(data.destination).emit("received_message_room", data)
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