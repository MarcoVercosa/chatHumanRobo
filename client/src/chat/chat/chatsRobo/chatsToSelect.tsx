import React, { } from 'react'
import "./chatsToSelect.css"
import { useDispatch, useSelector } from "react-redux"
import { openChatRoboReducer } from '../../../store/reducers/contentChat.reducer'
import ModalCreatChat from './modalCreateChat';



function ChatsRobo() {
    const dispatch = useDispatch()
    // const contentChatData: any = useSelector((state: any) => state)
    const contentChatData: any = useSelector((state: any) => state.listAllChatReducer)
    const { socket }: any = useSelector((state: any) => state.socketReducer)
    console.log(socket)
    console.log("renderizou chatsRobo")

    function OpenChatWindow(chatSelect: string) {
        dispatch(openChatRoboReducer(chatSelect))
    }

    return (

        <article className='article-janelas_chat'>
            <div className='article-janelas_chat-profile'>
                <p><span>User:</span> {localStorage.getItem("name")}</p>
                <p><span>ID:</span> {socket.id}</p>
            </div>
            <div className='article-janelas_chat-p'>
                <ModalCreatChat />

            </div>
            <div className='article-janelas_chat-p'>
                <i className="fas fa-2x fa-robot" style={{ color: "rgb(230, 104, 104)" }}></i>
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
            })}
        </article>
    )
}

export default ChatsRobo
