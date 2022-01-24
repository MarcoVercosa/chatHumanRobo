import React, { useEffect } from 'react'
import "./chatsToSelect.css"
import { useDispatch, useSelector } from "react-redux"
import {
    receiveMessageRoboReducer, addNewChatPrivateReducer, receiveMessagePrivateReducer,
    addNewChatRoomReducer, receiveMessageRoomReducer, activeWindowChat
}
    from '../../store/reducers/contentChat.reducer'

import ModalCreatChat from './modalCreateChat';
import ModalJoinToRoom from "../contentChat/modalJoinRoom"


function ChatsRobo() {
    const dispatch = useDispatch()
    // const contentChatData: any = useSelector((state: any) => state)
    const contentChatData: any = useSelector((state: any) => state.listAllChatReducer)
    const { socket }: any = useSelector((state: any) => state.socketReducer)

    function OpenChatWindow(chatSelect: string) {
        dispatch(activeWindowChat(chatSelect))
    }

    useEffect(() => {
        //recebe do servidor dados (se sucesso) para criar conversa privada. O client inicia o ciclo
        //poder ser por solicicitação da outra ponta, pois o amigo ao add, a outra ponta recebe a solicitação para criar o chat
        socket.on("create_chat_private_client", ({ sucess, message, userName, id, time }: any) => {
            if (sucess) {
                dispatch(addNewChatPrivateReducer({ sucess, userName, id, time }))
                alert(`Iniciado uma conversa com ${userName}. Check o painel a esquerda`)
            } else {
                alert(message)
            }
        })

        //recebe mensagem robo 
        socket.on("received_message_from_robo", ({ content, author, time, image, isCharts }: any) => {
            dispatch(receiveMessageRoboReducer({ content, author, time, image, isCharts }))
        })
        //recebe mensagem privada
        socket.on("received_message_private", ({ content, author, time, idDestiny, idSource }: any) => {
            dispatch(receiveMessagePrivateReducer({ content, author, time, idDestiny, idSource }))
        })

        //usado pelo server quando solciita criação de uma sala
        //recebe do servidor quando o solicitante cria um room Chat
        socket.on("confirm_create_room", ({ sucess, roomName, id, message, userName, time }: any) => {
            if (sucess) {
                dispatch(addNewChatRoomReducer({ roomName, id, message, userName, time }))
                alert("O usuário " + userName + " adicionou uma CHAT ROOM chamada " + roomName)
                return
            }
            alert(message)
        })
        //recebe se o cliente solicitar ingressar em um chatRoom
        //poder ser por solicitação da origem ao criar uma sala privada, ou do destino
        socket.on("add_chat_room", ({ sucess, roomName, id, message, userName, time }: any) => {
            if (sucess) {
                dispatch(addNewChatRoomReducer({ roomName, id, message, userName, time }))
                alert("O usuário " + userName + " adicionou uma CHAT ROOM chamada " + roomName)
                return
            }
            alert(message)
        })

        socket.on("received_message_room", ({ destination, message, author, chatID }: any) => {
            dispatch(receiveMessageRoomReducer({ destination, message, author, chatID }))
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
                        <div className='article-div-janelas_chat' key={index} onClick={() => { OpenChatWindow(data.chatID) }}>
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
                            <div className='article-div-janelas_chat' key={index} onClick={() => { OpenChatWindow(data.chatID) }}>
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
