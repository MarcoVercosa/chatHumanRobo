import React, { useState } from 'react'
import "./chat.css"

import ChatsToSelect from '../chatsToSelect/chatsToSelect'
import ContentChat from '../contentChat/contentChat'

function Chat() {
    const [menuMobileIsOpen, setMenuMobileIsOpen] = useState<boolean>(false)

    function OpenCloseMenuMobile() {
        setMenuMobileIsOpen(!menuMobileIsOpen)
        // modifica a position da classe abaixo div-chat-menu_conversas
        //static ela fica por traz do conteudo das conversas e abolute, visivel
    }

    return (
        <div className="div-chat">
            <button className='article-janelas_chat-menu-mobile'
                onClick={(event: any) => { OpenCloseMenuMobile() }}
            >MENU
            </button>
            <menu className="div-chat-menu_conversas"
                style={{
                    position: menuMobileIsOpen ? "absolute" : "static",
                }}
            >
                <ChatsToSelect />
            </menu>
            <menu className="div-chat-menu-conteudo">
                <ContentChat />
            </menu>
        </div >
    )
}

export default Chat