import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { contentChatReducer } from '../../../store/reducers/contentChat.reducer'
import { socketReducer } from "../../../store/reducers/socket.reducer"


function ContentChat() {
    const [typeMessage, setTypeMessage] = useState<string>("")
    const [message, setMessage] = useState<any>()

    const dispatch = useDispatch()
    const contentChatData: any = useSelector((state: any) => state)
    const { socket }: any = useSelector((state: any) => state.socketReducer.socketContent)
    console.log(socket)

    socket.on("received_message_from_robo", (data: any) => {
        console.log(data)
    })

    function SendMessage() {
        socket.emit("send_message_to_robo_imc", "Olá, sou humano")
    }

    return (
        <div>

            {contentChatData.contentChatReducer.contentChat.map((data: any, index: any) => {
                if (data.openChat) {
                    return (
                        <>
                            <h1>{data.chatName}</h1>
                            <input type="text"
                                onChange={(data: any) => { setTypeMessage(data.target.value) }}
                            />
                            <button
                                onClick={SendMessage}
                            >Enviar</button>
                        </>
                    )
                }
            })}

        </div>
    )
}

export default ContentChat

