import express from "express"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"

import { UserConnected } from "./socketsListeners/functionsSockets/functionUserConnected"
import { RoboIMC } from "./socketsListeners/functionsSockets/functionRoboIMC"
import { RoboReservatoriosSP } from "./socketsListeners/functionsSockets/functionRoboReservatoriosSP"
import { CreateChatPrivateServer } from "./socketsListeners/functionsSockets/functionCreateChatPrivate"
import { SendMenssageToPrivate } from "./socketsListeners/functionsSockets/functionSendMessageToPrivate"
import { CreateRoom } from "./socketsListeners/functionsSockets/functionCreateRoom"
import { JoinRoom } from "./socketsListeners/functionsSockets/functionJoinRoom"

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
        UserConnected(socket, store, data)
    })

    //checa se o id ou user existem, devolve as info para o solicitante
    // para que o client crie um chat no navegador
    // e envia para o destinatario a solicitaçao para criar um chat no navegador dle tambem
    socket.on("create_chat_private_server", (data: any) => {
        CreateChatPrivateServer(socket, data, store)
    })

    //conversa com unica pessoa - Chat Privado
    socket.on("send_message_to_private", (message: any) => {
        SendMenssageToPrivate(socket, message)
    })

    //cria uma sala
    socket.on("create_room", (data: any) => {
        CreateRoom(data, storeRooms, socket)
    })

    //adiciona o usuario a uma sala
    socket.on("join_room", (data: any) => {
        JoinRoom(data, storeRooms, socket)
    })

    //enviar mensagem a todos da sala
    socket.on("send_message_to_chat_room", (data: any) => {
        socket.in(data.destination).emit("received_message_room", data)
    })


    socket.on("send_message_to_robo_imc", (data: any) => {
        console.log("ROBO IMC")
        RoboIMC(socket, data)
    })
    socket.on("send_message_to_robo_reservatorios_sp", async (data: any) => {
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