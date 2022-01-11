import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { contentChatReducer } from '../../../store/reducers/contentChat.reducer'

function ContentChat() {


    const [typeMessage, setTypeMessage] = useState<string>("")
    const dispatch = useDispatch()

    const { socket }: any = useSelector((state: any) => state.socketReducer)
    const contentChatData: any = useSelector((state: any) => state.contentChatReducer)

    socket.once("received_message_from_robo", (message: any) => {
        let temp = JSON.parse(JSON.stringify(contentChatData))
        temp.map((data: any, index: any) => {
            if (message.author === data.chatNameDestination) {
                data.contentChat = [...data.contentChat, message]
            }
        })
        dispatch(contentChatReducer(temp))

    })

    function SendMessage({ message, author, destination }: any) {
        let date = new Date()
        let time = `${date.getHours()}:${date.getMinutes()}`

        let temp = JSON.parse(JSON.stringify(contentChatData))
        temp.map((data: any, index: number) => {
            if (destination === data.chatNameDestination) {
                data.contentChat = [...data.contentChat, { content: message, author, time }]
            }
        })
        dispatch(contentChatReducer(temp))
        socket.emit("send_message_to_robo_imc", { message, author, time })
    }

    console.log("Renderizou")
    return (
        <div>

            {contentChatData.map((data: any, index: any) => {
                if (data.openChat) {
                    //o chat que tiver como true o obj "data.openChat", terá a conversa aberta abaixo
                    return (
                        <>
                            <h1>{data.chatNameDestination}</h1>
                            {data.contentChat.map((data: any, index: number) => {
                                return (
                                    <p>{data.content} - {data.author} - {data.time}</p>
                                )
                            })}
                            <input type="text"
                                onChange={(data: any) => { setTypeMessage(data.target.value) }}
                            />
                            <button
                                onClick={() => { SendMessage({ message: typeMessage, author: data.nameSource, destination: data.chatNameDestination }) }}
                            >Enviar</button>
                        </>
                    )
                }
            })}

        </div>
    )
}

export default memo(ContentChat)

