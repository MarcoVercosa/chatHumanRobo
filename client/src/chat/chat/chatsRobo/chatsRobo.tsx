import React, { } from 'react'
import "./chatsRobo.css"
import { useDispatch, useSelector } from "react-redux"
import { openChatReducer } from '../../../store/reducers/contentChat.reducer'




function ChatsRobo() {
    const dispatch = useDispatch()
    // const contentChatData: any = useSelector((state: any) => state)
    const contentChatData: any = useSelector((state: any) => state.listAllChatReducer)
    console.log("renderizou chatsRobo")

    function OpenChatWindow(chatSelect: string) {
        dispatch(openChatReducer(chatSelect))
    }

    return (

        <article className='article-janelas_chat'>
            <div className='article-janelas_chat-p'>
                <i className="fas fa-3x fa-robot" style={{ color: "rgb(128, 128, 128)" }}></i>
            </div>

            {contentChatData &&
                contentChatData.map((data: any, index: any) => {

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
                })
            }
        </article>
    )
}

export default ChatsRobo
