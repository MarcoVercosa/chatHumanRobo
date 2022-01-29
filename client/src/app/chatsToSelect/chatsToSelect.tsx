import React, { useEffect, useState } from 'react'
import "./chatsToSelect.css"
import { useDispatch, useSelector } from "react-redux"
import {
    receiveMessageRoboReducer, addNewChatPrivateReducer, receiveMessagePrivateReducer,
    addNewChatRoomReducer, receiveMessageRoomReducer, activeWindowChat, deleteChatReducer
}
    from '../../store/reducers/contentChat.reducer'

import ModalCreatChat from './modals/modalCreateChat';
import ModalJoinToRoom from "./modals/modalJoinRoom"
import ModalDeleteChat from './modals/modalDeleteChat';
import ModalLogoffChat from './modals/modalLogoffChat';
import IconPerson from "../../icons/person.png"
import IconGroup from "../../icons/group.png"
import IconFood from "../../icons/food.png"
import IconWater from "../../icons/water.png"




function ChatsRobo(): JSX.Element {
    // console.log("carregou Chat To Select")
    const dispatch = useDispatch()
    const contentChatData: Array<{}> = useSelector((state: any) => state.listAllChatReducer)
    const { socket }: any = useSelector((state: any) => state.socketReducer)
    // let activedisablebuttonDelete: string = "none"

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
        <>
            <article className='article-janelas_chat'>
                <div className='article-janelas_chat-profile'>
                    <p><span>User:</span> {localStorage.getItem("name")}</p>
                    <p><span>ID:</span> {socket.id}</p>
                    <div className="article-janelas_chat-p " ><ModalLogoffChat /></div>
                </div>
                <div className='article-janelas_chat-p modalcreatchat'>
                    {/* modal que permite criar sala ou chamar private */}
                    <ModalCreatChat />
                </div>
                <div className='article-janelas_chat-p modaljointoroom'>
                    {/* modal que permite crir sala ou chamar private */}
                    <ModalJoinToRoom />

                </div>

                {contentChatData.map((data: any, index: any) => {
                    if (data.isRobo)//se o chat for de robo
                        return (
                            <div className='article-div-janelas_chat' key={index}
                                onClick={() => { OpenChatWindow(data.chatID) }}
                            >
                                <div className='article-div-janelas_chat-avatar'>
                                    <div className='article-div-janelas_chat-avatar-image'>
                                        {/* <i className={data.avatar} style={{ color: `${data.color}` }}></i> */}
                                        {data.chatNameDestination === "ROBÔ - IMC" && <img alt="robo imc" src={IconFood} />}
                                        {data.chatNameDestination === "ROBÔ - Reservatórios SP" && <img alt="robo reservatorios" src={IconWater} />}
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
                                <div className='article-div-janelas_chat' key={index}
                                    onClick={() => { OpenChatWindow(data.chatID) }}
                                >
                                    <div className='article-div-janelas_chat-avatar'>
                                        <div className='article-div-janelas_chat-avatar-image'>
                                            {/* se for sala, use o ícone X, se for privado, use o ícone Y */}
                                            {data.isRoom && <img alt="chat privado" src={IconGroup} />}
                                            {!data.isRoom && <img alt="chat grupo" src={IconPerson} />}
                                        </div>
                                    </div>
                                    <div className='article-div-janelas_chat-nome'>
                                        <p>{data.chatNameDestination}</p>
                                    </div>
                                    <div className='article-div-janelas_chat-remove'>
                                        <ModalDeleteChat data={data} />
                                    </div>
                                </div>
                            </>
                        )
                })}
            </article >
        </>
    )
}

export default ChatsRobo
