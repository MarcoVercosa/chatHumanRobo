import React, { useEffect } from 'react'
import "./chatsToSelect.css"
import { useDispatch, useSelector } from "react-redux"
// import { openChatRoboReducer } from '../../../store/reducers/contentChat.reducer'
import {
    receiveMessageRoboReducer, addNewChatPrivateReducer, receiveMessagePrivateReducer,
    addNewChatRoomReducer, receiveMessageRoomReducer, openChatRoboReducer
}
    from '../../../store/reducers/contentChat.reducer'

import ModalCreatChat from './modalCreateChat';
import ModalJoinToRoom from "../contentChat/modalJoinRoom"


function ChatsRobo() {
    const dispatch = useDispatch()
    // const contentChatData: any = useSelector((state: any) => state)
    const contentChatData: any = useSelector((state: any) => state.listAllChatReducer)
    const { socket }: any = useSelector((state: any) => state.socketReducer)

    function OpenChatWindow(chatSelect: string) {
        dispatch(openChatRoboReducer(chatSelect))
    }

    useEffect(() => {
        //recebe do servidor dados (se sucesso) para criar conversa privada. O client inicia o ciclo
        //poder ser por solicicitação da outra ponta, pois o amigo ao add, a outra ponta recebe a solicitação para criar o chat
        socket.on("create_chat_private_client", (message: any) => {
            if (message.sucess) {
                dispatch(addNewChatPrivateReducer(message))
                alert(`Iniciado uma conversa com ${message.userName}. Check o painel a esquerda`)
            } else {
                alert(message.message)
            }
        })

        //recebe mensagem robo 
        socket.on("received_message_from_robo", (message: any) => {
            dispatch(receiveMessageRoboReducer(message))
        })

        //recebe mensagem privada
        socket.on("received_message_private", (message: any) => {
            dispatch(receiveMessagePrivateReducer(message))
        })

        //recebe do servidor quando o solicitante cria um room Chat
        socket.on("confirm_create_room", (message: any) => {
            if (message.sucess) {
                dispatch(addNewChatRoomReducer(message))
                alert("O usuário " + message.userName + " adicionou uma CHAT ROOM chamada " + message.roomName)
                return
            }
            alert(message.message)
        })
        //recebe se o cliente solicitar ingressar em um chatRoom
        //poder ser por solicitação da origem ao criar uma sala privada, ou do destino
        socket.on("add_chat_room", (message: any) => {
            if (message.sucess) {
                dispatch(addNewChatRoomReducer(message))
                alert("O usuário " + message.userName + " adicionou uma CHAT ROOM chamada " + message.roomName)
                return
            }
            alert(message.message)
        })

        socket.on("received_message_room", (message: any) => {
            dispatch(receiveMessageRoomReducer(message))
        })

    }, [socket])


    return (
        <article className='article-janelas_chat'>
            <div className='article-janelas_chat-profile'>
                <p><span>User:</span> {localStorage.getItem("name")}</p>
                <p><span>ID:</span> {socket.id}</p>
            </div>
            <div className='article-janelas_chat-p'>
                {/* modal que permite crir sala ou chamar private */}
                <ModalCreatChat />
            </div>
            <div className='article-janelas_chat-p'>
                {/* modal que permite crir sala ou chamar private */}
                <ModalJoinToRoom />

            </div>


            {contentChatData.map((data: any, index: any) => {
                if (data.isRobo)//se o chat for de robo
                    return (
                        <div className='article-div-janelas_chat' key={index} onClick={() => { OpenChatWindow(data.chatNameDestination) }}>
                            <div className='article-div-janelas_chat-avatar'>
                                <div className='article-div-janelas_chat-avatar-image'>
                                    <i className={data.avatar} style={{ color: `${data.color}` }}></i>
                                </div>
                            </div>
                            <div className='article-div-janelas_chat-nome'>
                                <p>{data.chatNameDestination}</p>
                            </div>
                        </div>
                    )
                if (!data.isRobo)
                    return (
                        <>
                            <div className='article-div-janelas_chat' key={index} onClick={() => { OpenChatWindow(data.chatNameDestination) }}>
                                <div className='article-div-janelas_chat-avatar'>
                                    <div className='article-div-janelas_chat-avatar-image'>
                                        {/* se for sala, use o ícone X, se for privado, use o ícone Y */}
                                        <i className={data.isRoom ? "fas fa-3x fa-users" : "fas fa-3x fa-user-friends"} style={{ color: "rgb(103, 103, 103)" }}></i>
                                    </div>
                                </div>
                                <div className='article-div-janelas_chat-nome'>
                                    <p>{data.chatNameDestination.toUpperCase()}</p>
                                </div>
                            </div>
                        </>
                    )
            })}
        </article>
    )
}

export default ChatsRobo
