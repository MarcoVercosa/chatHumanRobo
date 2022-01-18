import React from 'react'
import "./chat.css"

import ChatsToSelect from './chatsRobo/chatsToSelect'
import ContentChat from './contentChat/contentChat'


function Chat() {
    console.log("renderizou chat")
    return (
        <div className="div-chat">
            <menu className="div-chat-menu_conversas">
                <ChatsToSelect />
            </menu>
            <menu className="div-chat-menu-conteudo">
                <ContentChat />
            </menu>
        </div>
    )
}

export default Chat
