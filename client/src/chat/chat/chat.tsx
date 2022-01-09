import React from 'react'
import "./chat.css"

import ChatsRobo from './chatsRobo/chatsRobo'
import ContentChat from './contentChat/contentChat'


function Chat() {
    return (
        <div className="div-chat">
            <menu className="div-chat-menu_conversas">
                <ChatsRobo />
            </menu>
            <menu className="div-chat-menu-conteudo">
                <ContentChat />
            </menu>
        </div>
    )
}

export default Chat
